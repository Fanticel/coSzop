namespace DTOs;

public class MultipleUsersDto
{
    public int Count { get; set; } = 0;
    public List<SingleUserPublicDto> Users { get; set; } = new List<SingleUserPublicDto>();
}