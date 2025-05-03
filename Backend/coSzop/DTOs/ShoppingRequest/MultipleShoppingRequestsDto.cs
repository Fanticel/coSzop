namespace DTOs.ShoppingRequest;

public class MultipleShoppingRequestsDto
{
    public int Count { get; set; }
    public List<SingleShoppingRequestDto> ShoppingRequests { get; set; }
}