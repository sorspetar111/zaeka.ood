public class UserControlPermission
{
    public int UserId { get; set; }
    public virtual User User { get; set; }

    public int ControlId { get; set; }
    public virtual Control Control { get; set; }
}