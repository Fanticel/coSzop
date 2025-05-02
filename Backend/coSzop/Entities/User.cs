using System.ComponentModel.DataAnnotations;

namespace Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string PhoneNumber { get; set; }
    public string Nickname { get; set; }
    public UserAddress? Address { get; set; }

    public User(){}
}