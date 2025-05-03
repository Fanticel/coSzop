using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RepositoryContracts;

namespace EFCRepositories.Repositories;

public class EfcUserRepository : IUserRepository
{
    private readonly CoSzopContext ctx;

    public EfcUserRepository(CoSzopContext ctx)
    {
        this.ctx = ctx;
    }
    
    public async Task<User> AddAsync(User user)
    {
        EntityEntry<User> entityEntry = await ctx.Users.AddAsync(user);
        await ctx.SaveChangesAsync();
        return entityEntry.Entity;
    }

    public async Task UpdateAsync(User user)
    {
        if (!(await ctx.Users.AnyAsync(u => u.Id == user.Id)))
        {
            throw new ArgumentException($"Could not find the user with id: {user.Id}");
        }

        ctx.Users.Update(user);
        await ctx.SaveChangesAsync();
    }

    public async Task DeteleAsync(int userId)
    {
        User? existing = await ctx.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (existing == null)
        {
            throw new ArgumentException($"Could not find the user with id: {userId}");
        }

        ctx.Users.Remove(existing);
        await ctx.SaveChangesAsync();
    }

    public async Task<User> GetSingleAsync(int id)
    {
        User? existing = await ctx.Users.Include(u => u.Address).SingleOrDefaultAsync(u => u.Id == id);
        if (existing == null)
        {
            throw new ArgumentException($"Could not find the user with id: {id}");
        }

        return existing;
    }

    public async Task<User> GetSingleByEmailAsync(string email)
    {
        User? existing = await ctx.Users.Include(u => u.Address).SingleOrDefaultAsync(u => u.Email == email);
        if (existing == null)
        {
            throw new ArgumentException($"Could not find the user with the email: {email}");
        }

        return existing;
    }

    public IQueryable<User> GetMany()
    {
        return ctx.Users.AsQueryable();
    }
}