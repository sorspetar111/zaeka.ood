public class User
{
	public int Id { get; set; }
	public string UserName { get; set; }
	public string Email { get; set; }
	public string PasswordHash { get; set; }
	public RoleType Role { get; set; }
	public bool IsActive { get; set; }
	public DateTime CreatedAt { get; set; }

	public virtual ICollection<UserControlPermission> UserControlPermissions { get; set; } = new List<UserControlPermission>();
	public virtual ICollection<EventLog> EventLogs { get; set; } = new List<EventLog>();

}