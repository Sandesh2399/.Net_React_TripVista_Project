using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class DestinationAddResponse : BaseResponse
    {
        public DestinationAddResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public int DestinationId { get; set; }
    }
}
