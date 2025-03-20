using System.ComponentModel.DataAnnotations;

namespace SampleService.Models
{
    public class AttendanceModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}