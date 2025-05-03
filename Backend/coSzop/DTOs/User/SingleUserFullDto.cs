namespace DTOs;

public class SingleUserFullDto
{
    public int Id { get; set; }
    public string? Nickname { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public AddressDto Address { get; set; }
}