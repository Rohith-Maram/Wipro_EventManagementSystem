using Microsoft.EntityFrameworkCore;

namespace SampleService.Models
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options) { }

        public DbSet<EventModel> Events { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<AttendanceModel> Attendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<AttendanceModel>()
                .HasIndex(a => new { a.EventId, a.UserId })
                .IsUnique();
        }
    }
}