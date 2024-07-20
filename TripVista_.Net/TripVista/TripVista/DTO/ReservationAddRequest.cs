using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class ReservationAddRequest
    {
        [Key]
        public int ReservationId { get; set; }

        public int UserId { get; set; }

        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public int DestinationId { get; set; }
        public string? Destination {  get; set; }
        public int PackageId { get; set; }
        public string? PackageName { get; set; }
        public int HotelId { get; set; }


        [Column(TypeName = "datetime")]
        public string ReservationDate { get; set; }

        [Column(TypeName = "datetime")]
        public string StartDate { get; set; }

        [Column(TypeName = "datetime")]
        public string EndDate { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Confirm";
        public decimal TotalPrice { get; set; }

        public int NoOfPeople { get; set; }
    }
}
