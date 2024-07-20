using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class HotelAddResponse : BaseResponse
    {
        public HotelAddResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public int HotelId { get; set; }
    }

}