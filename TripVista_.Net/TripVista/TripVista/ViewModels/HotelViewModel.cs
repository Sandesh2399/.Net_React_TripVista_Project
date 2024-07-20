namespace TripVista
{
    public class HotelViewModel
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
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public string? ImageUrl { get; set; }
    }
}
