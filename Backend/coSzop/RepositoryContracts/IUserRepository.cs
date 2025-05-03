using Entities;

namespace RepositoryContracts;

public interface IUserRepository
{
    Task<User> AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(int userId);
    Task<User> GetSingleAsync(int id);
    Task<User> GetSingleByEmailAsync(string email);
    IQueryable<User> GetMany();
}