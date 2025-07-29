public class EventLog
{
    public long Id { get; set; } // bigint съответства на long
    public DateTime Timestamp { get; set; }
    public string EventType { get; set; }
    public int? UserId { get; set; } // Nullable, тъй като може да няма потребител
    public string? Details { get; set; }
    public string? AdditionalInfo { get; set; }

    // Navigation Property
    public virtual User? User { get; set; }
}