namespace DTOs.ShoppingRequest;

public class SingleShoppingRequestDto
{
    public int Id { get; set; }
    public string Items { get; set; }
    public string Description { get; set; }
    public double MaximumPrice { get; set; }
    public DateTime DateTimeCreated { get; set; }
    public string Status { get; set; }
    public int UserId { get; set; }
    public int? BringerId { get; set; }
}