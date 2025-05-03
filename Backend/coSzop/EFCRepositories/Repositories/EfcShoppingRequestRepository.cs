using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RepositoryContracts;
using Utility;

namespace EFCRepositories.Repositories;

public class EfcShoppingRequestRepository : IShoppingRequestRepository
{
    private readonly CoSzopContext ctx;
    
    public EfcShoppingRequestRepository(CoSzopContext ctx)
    {
        this.ctx = ctx;
    }
    
    public async Task<ShoppingRequest> AddAsync(ShoppingRequest request)
    {
        EntityEntry<ShoppingRequest> entityEntry = await ctx.ShoppingRequests.AddAsync(request);
        await ctx.SaveChangesAsync();
        return entityEntry.Entity;
    }

    public async Task UpdateAsync(ShoppingRequest request)
    {
        if (!(await ctx.ShoppingRequests.AnyAsync(u => u.Id == request.Id)))
        {
            throw new ArgumentException($"Could not find the request with id: {request.Id}");
        }
        if (!await ctx.ShoppingRequests.AnyAsync(u => u.UserId == request.UserId))
        {
            throw new ArgumentException($"User with ID {request.UserId} does not exist.");
        }

        ctx.ShoppingRequests.Update(request);
        await ctx.SaveChangesAsync();
    }

    public async Task DeleteAsync(int requestId)
    {
        ShoppingRequest? existing = await ctx.ShoppingRequests.SingleOrDefaultAsync(u => u.Id == requestId);
        if (existing == null)
        {
            throw new ArgumentException($"Could not find the request with id: {requestId}");
        }

        ctx.ShoppingRequests.Remove(existing);
        await ctx.SaveChangesAsync();
    }

    public async Task<ShoppingRequest> GetSingleAsync(int id)
    {
        ShoppingRequest? existing = await ctx.ShoppingRequests.SingleOrDefaultAsync(u => u.Id == id);
        if (existing == null)
        {
            throw new ArgumentException($"Could not find the request with id: {id}");
        }

        return existing;
    }

    public IQueryable<ShoppingRequest> GetMany()
    {
        return ctx.ShoppingRequests.AsQueryable();
    }

    public IQueryable<ShoppingRequest> GetAllWithinDistance(int meters, User origin)
    {
        var requests = ctx.ShoppingRequests.
            Include(r => r.User).
            Include(r => r.User.Address).
            AsQueryable().ToList();
        var requestsCloseEnough = new List<ShoppingRequest>();
        
        requests.ForEach(req =>
        {
            var distance = Coordinates.CalculateDistanceInMeters(
                req.User.Address.Latiture,
                req.User.Address.Longitute,
                origin.Address.Latiture,
                origin.Address.Longitute);

            if (distance <= meters)
            {
                requestsCloseEnough.Add(req);
            }
        });

        return requestsCloseEnough.AsQueryable();
    }
}