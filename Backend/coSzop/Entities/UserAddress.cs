namespace Entities;

public class UserAddress
{
    
    public int Id { get; set; }
    public string Address { get; set; }
    
    public string UserId { get; set; }
    public User AddressUser { get; set; } = null!;
    
    private UserAddress(){}
}