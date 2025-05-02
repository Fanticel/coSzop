using Entities;
using Microsoft.EntityFrameworkCore;

namespace EFCRepositories;

public class CoSzopContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<UserAddress> UserAddresses => Set<UserAddress>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=app.db");
    }
}