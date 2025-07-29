public class Control
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int SectionId { get; set; }

    // Navigation Properties
    public virtual Section Section { get; set; }
    public virtual ICollection<UserControlPermission> UserControlPermissions { get; set; } = new List<UserControlPermission>();
}