namespace DTOs;

public class RegisterUserDto
{
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Nickname { get; set; }
    public AddressDto Address { get; set; }
}