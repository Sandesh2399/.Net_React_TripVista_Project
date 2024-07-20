using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class ReservationViewModel
    {
        public int ReservationId { get; set; }
        public int UserId { get; set; }
        public int? HotelId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int DestinationId { get; set; }
        public string Destination { get; set; }
        public int PackageId { get; set; }
        public string PackageName { get; set; }
        public string ReservationDate { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Status { get; set; } = null!;
        public decimal TotalPrice { get; set; }
        public int NoOfPeople { get; set; }
    }
}
