using DTOs;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepositoryContracts;
using WebApplication1.Auth;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<SingleUserFullDto>> AddUser([FromBody] RegisterUserDto user)
    {
        try
        {
           User userToAdd = new User
            {
                Email = user.Email,
                Password = user.Password,
                PhoneNumber = user.PhoneNumber,
                Nickname = user.Nickname,
                Address = new UserAddress
                {
                    Address = user.Address.Address,
                    Longitute = user.Address.Longitude,
                    Latiture = user.Address.Latitude
                }
            };

            var addedUser = await _userRepository.AddAsync(userToAdd);
            var addedUserDto = new SingleUserFullDto
            {
                Id = addedUser.Id,
                Email = addedUser.Email,
                Nickname = userToAdd.Nickname,
                PhoneNumber = addedUser.PhoneNumber,
                Address = new AddressDto
                {
                    Address = addedUser.Address.Address,
                    Longitude = addedUser.Address.Longitute,
                    Latitude = addedUser.Address.Latiture
                }
            };
            return Ok(addedUserDto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SingleUserPublicDto>> GetSingleUserById([FromRoute] int id)
    {
        try
        {
            var retrievedUser = await _userRepository.GetSingleAsync(id);
            return new SingleUserPublicDto
            {
                Id = retrievedUser.Id,
                Nickname = retrievedUser.Nickname,
                PhoneNumber = retrievedUser.PhoneNumber
            };
        }
        catch (ArgumentException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [Authorize]
    [HttpGet("full/{id:int}")]
    public async Task<ActionResult<SingleUserFullDto>> GetSingleFullUserById([FromRoute] int id)
    {
        try
        {
            var retrievedUser = await _userRepository.GetSingleAsync(id);
            return new SingleUserFullDto
            {
                Id = retrievedUser.Id,
                Email = retrievedUser.Email,
                Nickname = retrievedUser.Nickname,
                PhoneNumber = retrievedUser.PhoneNumber,
                Address = new AddressDto
                {
                    Address = retrievedUser.Address.Address,
                    Longitude = retrievedUser.Address.Longitute,
                    Latitude = retrievedUser.Address.Latiture
                }
            };
        }
        catch (ArgumentException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpGet]
    public ActionResult<MultipleUsersDto> GetManyUsers()
    {
        try
        {
            List<User> retreivedUsers = _userRepository.GetMany().ToList();
            List<SingleUserPublicDto> users = new List<SingleUserPublicDto>();
            retreivedUsers.ForEach(user =>
            {
                users.Add(new SingleUserPublicDto
                {
                    Id = user.Id,
                    Nickname = user.Nickname,
                    PhoneNumber = user.PhoneNumber
                });
            });
            var dto = new MultipleUsersDto
            {
                Count = users.Count,
                Users = users
            };
            return Ok(dto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<SingleUserFullDto>> UpdateSingleUser([FromBody] UpdateUserDto dto)
    {
        if(dto.Nickname.Equals(""))
        {
            return BadRequest("Username required.");
        }
        
        if(dto.Password.Equals(""))
        {
            return BadRequest("Password required.");
        }
        
        if(dto.Nickname.Equals("string")|| dto.Password.Equals("string"))
        {
            return BadRequest("Invalid input.");
        }

        try
        {
            User user = new User
            {
                Id = dto.Id,
                Email = dto.Email,
                Password = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                Nickname = dto.Nickname,
                Address = new UserAddress
                {
                    Address = dto.Address.Address,
                    Longitute = dto.Address.Longitude,
                    Latiture = dto.Address.Latitude
                }
            };
            await _userRepository.UpdateAsync(user);
            User updatedUser = await _userRepository.GetSingleAsync(user.Id);
            var updatedUserDto = new SingleUserFullDto
            {
                Id = updatedUser.Id,
                Email = updatedUser.Email,
                Nickname = updatedUser.Nickname,
                PhoneNumber = updatedUser.PhoneNumber,
                Address = new AddressDto
                {
                    Address = updatedUser.Address.Address,
                    Longitude = updatedUser.Address.Longitute,
                    Latitude = updatedUser.Address.Latiture
                }
            };
            return Ok(updatedUserDto);
        }
        catch (ArgumentException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult> DeleteSingleUser([FromBody] LoginUserDto dto)
    {
        try
        {
            var userToDelete = await _userRepository.GetSingleByEmailAsync(dto.Email);
            if (PasswordHandler.Validate(userToDelete.Password, dto.Password))
            {
                await _userRepository.DeleteAsync(userToDelete.Id);
                return Ok("Account deleted successfully");
            }

            return Unauthorized("Wrong password");

        }
        catch (ArgumentException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}