using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class DestinationViewModel
    {
        public int DestinationId { get; set; }
        public string DestinationName { get; set; } = null!;
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? ImageUrl { get; set; }
    }
}
