public class UserDto
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Role { get; set; } // Използваме string за простота
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}