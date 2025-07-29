
public class Region
{
    public int Id { get; set; }
    public string Name { get; set; }
  
    public virtual ICollection<Section> Sections { get; set; } = new List<Section>();
}