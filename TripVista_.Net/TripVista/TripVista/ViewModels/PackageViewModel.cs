using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class PackageViewModel
    {
        public int PackageId { get; set; }
        public string PackageName { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int DurationDays { get; set; }
        public int DestinationId { get; set; }
        public string? Destination { get; set; }
        public string? ImageUrl { get; set; }
        public int? HotelId { get; set; }
        public HotelDetails HotelDetails { get; set; }

    }

    public class HotelDetails
    {
        public int HotelId { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string ZipCode { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public int NumberOfRooms { get; set; }
        public int Rating { get; set; }
        public string? Amenities { get; set; }
        public string? ImageUrl { get; set; }
    }
}
