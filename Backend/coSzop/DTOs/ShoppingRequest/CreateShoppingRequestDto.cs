namespace DTOs.ShoppingRequest;

public class CreateShoppingRequestDto
{
    public string Items { get; set; }
    public string Description { get; set; }
    public double MaximumPrice { get; set; }
    public string Status { get; set; }
    public int UserId { get; set; }
}