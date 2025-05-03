using System.Security.Cryptography;
using DTOs;
using Entities;
using Microsoft.AspNetCore.Mvc;
using RepositoryContracts;
using WebApplication1.Auth;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController: ControllerBase
{
    private readonly TokenProvider tokenProvider;
    private readonly IUserRepository userRepository;
    
    public AuthController(IUserRepository userRepository, TokenProvider tokenProvider)
    {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginUserDto dto)
    {
        try
        {
            var userTryingToLogIn = await userRepository.GetSingleByEmailAsync(dto.Email);
            if (PasswordHandler.Validate(userTryingToLogIn.Password, dto.Password))
            {
                return tokenProvider.Create(userTryingToLogIn);
            }

            return Unauthorized("The password was incorrect");
        }
        catch (ArgumentException e)
        {
            return NotFound("User with the specified email address does not exist");
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<string>> Register([FromBody] RegisterUserDto dto)
    {
        try
        {
            User userToAdd = new User
            {
                Email = dto.Email,
                Password = PasswordHandler.Hash(dto.Password),
                PhoneNumber = dto.PhoneNumber,
                Nickname = dto.Nickname,
                Address = new UserAddress
                {
                    Address = dto.Address.Address,
                    Longitute = dto.Address.Longitude,
                    Latiture = dto.Address.Latitude
                }
            };

            var addedUser = await userRepository.AddAsync(userToAdd);
            return Ok(tokenProvider.Create(addedUser));
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}