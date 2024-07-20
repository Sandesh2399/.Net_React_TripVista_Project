using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class PackageAddRequest
    {
        [Key]
        public int PackageId { get; set; }
        public int HotelId { get; set; }

        [StringLength(255)]
        public string PackageName { get; set; } = null!;

        public string? Description { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        public int DurationDays { get; set; }

        public int DestinationId { get; set; }

        [StringLength(255)]
        public string? ImageUrl { get; set; }
        public IFormFile? Image { get; set; }
    }
}
