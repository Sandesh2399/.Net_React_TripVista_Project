using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class DestinationAddRequest
    {
        public int DestinationId { get; set; }

        [StringLength(255)]
        public string DestinationName { get; set; } = null!;

        public string? Description { get; set; }

        [StringLength(255)]
        public string? Location { get; set; }

        public IFormFile? Image { get; set; }

        [StringLength(255)]
        public string? ImageUrl { get; set; }
    }
}
