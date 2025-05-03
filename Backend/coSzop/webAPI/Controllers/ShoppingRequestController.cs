using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DTOs;
using DTOs.ShoppingRequest;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepositoryContracts;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/shopping-request")]
public class ShoppingRequestController : ControllerBase
{
    private readonly IShoppingRequestRepository shoppingRequestRepository;
    private readonly IUserRepository userRepository;

    public ShoppingRequestController(IShoppingRequestRepository shoppingRequestRepository,
        IUserRepository userRepository)
    {
        this.shoppingRequestRepository = shoppingRequestRepository;
        this.userRepository = userRepository;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<SingleShoppingRequestDto>> AddRequest([FromBody] CreateShoppingRequestDto dto)
    {
        try
        {
            var owner = await userRepository.GetSingleAsync(dto.UserId);
            ShoppingRequest requestToAdd = new ShoppingRequest
            {
                DateTimeCreated = DateTime.UtcNow,
                Description = dto.Description,
                Items = dto.Items,
                MaximumPrice = dto.MaximumPrice,
                Status = dto.Status,
                UserId = owner.Id,
                BringerId = null
            };
            var addedRequest = await shoppingRequestRepository.AddAsync(requestToAdd);
            owner.ShoppingRequests.Add(addedRequest);
            return Ok(new SingleShoppingRequestDto
            {
                Id = addedRequest.Id,
                DateTimeCreated = addedRequest.DateTimeCreated,
                Description = addedRequest.Description,
                Items = addedRequest.Items,
                MaximumPrice = addedRequest.MaximumPrice,
                Status = addedRequest.Status,
                UserId = owner.Id,
                BringerId = addedRequest.BringerId
            });
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
    [HttpGet("{id:int}")]
    public async Task<ActionResult<SingleShoppingRequestDto>> GetSingleRequestById([FromRoute] int id)
    {
        try
        {
            var retreivedRequest = await shoppingRequestRepository.GetSingleAsync(id);
            return Ok(new SingleShoppingRequestDto
            {
                Id = retreivedRequest.Id,
                DateTimeCreated = retreivedRequest.DateTimeCreated,
                Description = retreivedRequest.Description,
                Items = retreivedRequest.Items,
                MaximumPrice = retreivedRequest.MaximumPrice,
                Status = retreivedRequest.Status,
                UserId = retreivedRequest.UserId,
                BringerId = retreivedRequest.BringerId
            });
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
    [HttpGet]
    public async Task<ActionResult<MultipleShoppingRequestsDto>> GetManyRequests()
    {
        try
        {
            List<ShoppingRequest> retreivedRequests = shoppingRequestRepository.GetMany().ToList();
            List<SingleShoppingRequestDto> requests = new List<SingleShoppingRequestDto>();
            retreivedRequests.ForEach(req =>
            {
                requests.Add(new SingleShoppingRequestDto
                {
                    Id = req.Id,
                    DateTimeCreated = req.DateTimeCreated,
                    Description = req.Description,
                    Items = req.Items,
                    MaximumPrice = req.MaximumPrice,
                    Status = req.Status,
                    UserId = req.UserId,
                    BringerId = req.BringerId
                });
            });
            var dto = new MultipleShoppingRequestsDto()
            {
                Count = retreivedRequests.Count,
                ShoppingRequests = requests
            };
            return Ok(dto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [Authorize]
    [HttpGet("limited/range/{range:int}/from/{userId:int}")]
    public async Task<ActionResult<MultipleShoppingRequestsDto>> GetManyRequestsWithinRange([FromRoute] int range, [FromRoute] int userId)
    {
        try
        {
            User origin = await userRepository.GetSingleAsync(userId);
            List<ShoppingRequest> retreivedRequests = shoppingRequestRepository.GetAllWithinDistance(range, origin).ToList();
            List<SingleShoppingRequestDto> requests = new List<SingleShoppingRequestDto>();
            retreivedRequests.ForEach(req =>
            {
                requests.Add(new SingleShoppingRequestDto
                {
                    Id = req.Id,
                    DateTimeCreated = req.DateTimeCreated,
                    Description = req.Description,
                    Items = req.Items,
                    MaximumPrice = req.MaximumPrice,
                    Status = req.Status,
                    UserId = req.UserId,
                    BringerId = req.BringerId
                });
            });
            var outputDto = new MultipleShoppingRequestsDto()
            {
                Count = retreivedRequests.Count,
                ShoppingRequests = requests
            };
            return Ok(outputDto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [Authorize]
    [HttpGet("limited/status/{status}")]
    public async Task<ActionResult<MultipleShoppingRequestsDto>> GetManyRequestsWithStatus([FromRoute] string status)
    {
        try
        {
            List<ShoppingRequest> retreivedRequests = shoppingRequestRepository.GetMany().ToList();
            List<SingleShoppingRequestDto> requests = new List<SingleShoppingRequestDto>();
            retreivedRequests.ForEach(req =>
            {
                if (req.Status == status)
                {
                    requests.Add(new SingleShoppingRequestDto
                    {
                        Id = req.Id,
                        DateTimeCreated = req.DateTimeCreated,
                        Description = req.Description,
                        Items = req.Items,
                        MaximumPrice = req.MaximumPrice,
                        Status = req.Status,
                        UserId = req.UserId,
                        BringerId = req.BringerId
                    });
                }
            });
            var outputDto = new MultipleShoppingRequestsDto()
            {
                Count = retreivedRequests.Count,
                ShoppingRequests = requests
            };
            return Ok(outputDto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [Authorize]
    [HttpGet("limited/user/{userId:int}")]
    public async Task<ActionResult<MultipleShoppingRequestsDto>> GetManyRequestsByUser([FromRoute] int userId)
    {
        try
        {
            List<ShoppingRequest> retreivedRequests = shoppingRequestRepository.GetMany().ToList();
            List<SingleShoppingRequestDto> requests = new List<SingleShoppingRequestDto>();
            retreivedRequests.ForEach(req =>
            {
                if (req.UserId == userId)
                {
                    requests.Add(new SingleShoppingRequestDto
                    {
                        Id = req.Id,
                        DateTimeCreated = req.DateTimeCreated,
                        Description = req.Description,
                        Items = req.Items,
                        MaximumPrice = req.MaximumPrice,
                        Status = req.Status,
                        UserId = req.UserId,
                        BringerId = req.BringerId
                    });
                }
            });
            var outputDto = new MultipleShoppingRequestsDto()
            {
                Count = retreivedRequests.Count,
                ShoppingRequests = requests
            };
            return Ok(outputDto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [Authorize]
    [HttpGet("limited/bringer/{userId:int}")]
    public async Task<ActionResult<MultipleShoppingRequestsDto>> GetManyRequestsByBringer([FromRoute] int userId)
    {
        try
        {
            List<ShoppingRequest> retreivedRequests = shoppingRequestRepository.GetMany().ToList();
            List<SingleShoppingRequestDto> requests = new List<SingleShoppingRequestDto>();
            retreivedRequests.ForEach(req =>
            {
                if (req.BringerId == userId)
                {
                    requests.Add(new SingleShoppingRequestDto
                    {
                        Id = req.Id,
                        DateTimeCreated = req.DateTimeCreated,
                        Description = req.Description,
                        Items = req.Items,
                        MaximumPrice = req.MaximumPrice,
                        Status = req.Status,
                        UserId = req.UserId,
                        BringerId = req.BringerId
                    });
                }
            });
            var outputDto = new MultipleShoppingRequestsDto()
            {
                Count = retreivedRequests.Count,
                ShoppingRequests = requests
            };
            return Ok(outputDto);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<SingleShoppingRequestDto>> UpdateSingleShoppingRequest([FromBody] UpdateShoppingRequestDto dto)
    {
        try
        {
            ShoppingRequest shoppingRequest = new ShoppingRequest
            {
                Id = dto.Id,
                DateTimeCreated = DateTime.UtcNow,
                Description = dto.Description,
                Items = dto.Items,
                MaximumPrice = dto.MaximumPrice,
                Status = dto.Status,
                UserId = dto.UserId,
                BringerId = dto.BringerId
            };

            await shoppingRequestRepository.UpdateAsync(shoppingRequest);
            ShoppingRequest updatedRequest = await shoppingRequestRepository.GetSingleAsync(dto.Id);
            var updatedRequestDto = new SingleShoppingRequestDto
            {
                Id = updatedRequest.Id,
                DateTimeCreated = updatedRequest.DateTimeCreated,
                Description = updatedRequest.Description,
                Items = updatedRequest.Items,
                MaximumPrice = updatedRequest.MaximumPrice,
                Status = updatedRequest.Status,
                UserId = updatedRequest.UserId,
                BringerId = updatedRequest.BringerId
            };
            return Ok(updatedRequestDto);
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
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteSingleUser([FromRoute] int id)
    {
        try
        {
            var requestToDelete = await shoppingRequestRepository.GetSingleAsync(id);
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            if (int.TryParse(userIdClaim, out int userId) && userId == requestToDelete.UserId)
            {
                await shoppingRequestRepository.DeleteAsync(requestToDelete.Id);
                return Ok("The request was successfully deleted.");
            }

            return Unauthorized("Only the author can delete their request");

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