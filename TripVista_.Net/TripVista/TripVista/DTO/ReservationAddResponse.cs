using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class ReservationAddResponse : BaseResponse
    {
        public ReservationAddResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public int ReservationId { get; set; }
    }
}
