using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class BaseResponse
    {
        public BaseResponse(List<ValidationResult> validationResults)
        {
            this.ValidationResult = new ValidationResponse(validationResults);
        }

        public ValidationResponse ValidationResult { get; set; }
    }

    public class CustomValidationResult : ValidationResult
    {
        public CustomValidationResult(string errorMessage) : base(errorMessage) { }
        public string? StackTrace { get; set; }
    }
}
