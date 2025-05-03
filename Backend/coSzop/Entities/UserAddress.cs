namespace Entities;

public class UserAddress
{
    
    public int Id { get; set; }
    public string Address { get; set; }
    public float Longitute { get; set; }
    public float Latiture { get; set; }
    
    public int UserId { get; set; }
    public User AddressUser { get; set; } = null!;
    
    public UserAddress(){}
}