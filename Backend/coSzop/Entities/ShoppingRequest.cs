namespace Entities;

public class ShoppingRequest
{
    public int Id { get; set; }
    public string Items { get; set; }
    public string Description { get; set; }
    public double MaximumPrice { get; set; }
    public DateTime DateTimeCreated { get; set; }
    public string Status { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}