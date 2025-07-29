using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    // DbSet за всяка таблица в базата данни
    public DbSet<User> Users { get; set; }
    public DbSet<Region> Regions { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<Control> Controls { get; set; }
    public DbSet<UserControlPermission> UserControlPermissions { get; set; }
    public DbSet<EventLog> EventLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Конфигурация за User Entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users"); // Указваме името на таблицата

            entity.HasKey(e => e.Id);

            entity.HasIndex(e => e.UserName).IsUnique();
            entity.Property(e => e.UserName).IsRequired().HasMaxLength(100);

            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);

            entity.Property(e => e.PasswordHash).IsRequired();

            entity.Property(e => e.Role)
                  .IsRequired()
                  .HasMaxLength(50)
                  .HasConversion<string>(); // Конвертира Enum към string

            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // Конфигурация за Region Entity
        modelBuilder.Entity<Region>(entity =>
        {
            entity.ToTable("Regions");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
        });

        // Конфигурация за Section Entity
        modelBuilder.Entity<Section>(entity =>
        {
            entity.ToTable("Sections");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);

            // Връзка "един-към-много" с Region
            entity.HasOne(s => s.Region)
                  .WithMany(r => r.Sections)
                  .HasForeignKey(s => s.RegionId)
                  .OnDelete(DeleteBehavior.Cascade); // ON DELETE CASCADE
        });

        // Конфигурация за Control Entity
        modelBuilder.Entity<Control>(entity =>
        {
            entity.ToTable("Controls");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);

            // Връзка "един-към-много" със Section
            entity.HasOne(c => c.Section)
                  .WithMany(s => s.Controls)
                  .HasForeignKey(c => c.SectionId)
                  .OnDelete(DeleteBehavior.Cascade); // ON DELETE CASCADE
        });
        
        // Конфигурация за UserControlPermission (Many-to-Many Join Table)
        modelBuilder.Entity<UserControlPermission>(entity =>
        {
            entity.ToTable("UserControlPermissions");
            
            // Дефиниране на съставен първичен ключ (Composite Primary Key)
            entity.HasKey(ucp => new { ucp.UserId, ucp.ControlId });

            // Връзка с User
            entity.HasOne(ucp => ucp.User)
                  .WithMany(u => u.UserControlPermissions)
                  .HasForeignKey(ucp => ucp.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            // Връзка с Control
            entity.HasOne(ucp => ucp.Control)
                  .WithMany(c => c.UserControlPermissions)
                  .HasForeignKey(ucp => ucp.ControlId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Конфигурация за EventLog Entity
        modelBuilder.Entity<EventLog>(entity =>
        {
            entity.ToTable("EventLogs");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.EventType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Timestamp).HasDefaultValueSql("GETUTCDATE()");
            
            // Връзка с User, която е опционална
            entity.HasOne(e => e.User)
                  .WithMany(u => u.EventLogs)
                  .HasForeignKey(e => e.UserId)
                  .IsRequired(false) // Прави връзката незадължителна (nullable FK)
                  .OnDelete(DeleteBehavior.SetNull); // ON DELETE SET NULL

            // Индекс от T-SQL скрипта
            entity.HasIndex(e => new { e.EventType, e.Timestamp });
        });
    }
}
