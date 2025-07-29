public class Section
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int RegionId { get; set; }

    // Navigation Properties
    public virtual Region Region { get; set; }
    public virtual ICollection<Control> Controls { get; set; } = new List<Control>();
}