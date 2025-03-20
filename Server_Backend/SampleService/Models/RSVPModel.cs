using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SampleService.Models
{
    public class RSVPModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("EventId")]
        public EventModel Event { get; set; }

        [ForeignKey("UserId")]
        public UserModel User { get; set; }
    }
}
