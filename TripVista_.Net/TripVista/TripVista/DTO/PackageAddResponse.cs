using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class PackageAddResponse : BaseResponse
    {
        public PackageAddResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public int PackageId { get; set; }
    }
}
