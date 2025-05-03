using Entities;

namespace RepositoryContracts;

public interface IShoppingRequestRepository
{
    Task<ShoppingRequest> AddAsync(ShoppingRequest request);
    Task UpdateAsync(ShoppingRequest request);
    Task DeleteAsync(int requestId);
    Task<ShoppingRequest> GetSingleAsync(int id);
    IQueryable<ShoppingRequest> GetMany();
    IQueryable<ShoppingRequest> GetAllWithinDistance(int meters, User origin);
}