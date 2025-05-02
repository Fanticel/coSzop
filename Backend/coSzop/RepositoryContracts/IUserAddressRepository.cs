using Entities;

namespace RepositoryContracts;

public interface IUserAddressRepository
{
    Task<UserAddress> AddAsync(UserAddress user);
    Task UpdateAsync(UserAddress user);
    Task DeteleAsync(UserAddress user);
    Task<UserAddress> GetSingleAsync(int id);
    IQueryable<UserAddress> GetMany();
}