using Entities;
using Microsoft.EntityFrameworkCore;

namespace EFCRepositories;

public class CoSzopContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<UserAddress> UserAddresses => Set<UserAddress>();
    public DbSet<ShoppingRequest> ShoppingRequests => Set<ShoppingRequest>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=C:\\Users\\Electimore\\Desktop\\UniStuff\\Sem4\\ViaHACK2025\\coSzop\\Backend\\coSzop\\EFCRepositories\\app.db");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        builder.Entity<User>()
            .HasMany(u => u.AcceptedRequests)
            .WithOne(r => r.Bringer)
            .HasForeignKey(r => r.BringerId)
            .IsRequired(false);
    }
}