using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TripVista
{
    public class ValidationResponse
    {
        [JsonConstructor]
        public ValidationResponse()
        {

        }
        public bool Success { get; set; }
        public string? Message { get; set; }
        public List<ValidationError>? Errors { get; set; }
        [JsonIgnore]
        public List<ValidationResult>? ValidationResults { get; set; }

        public ValidationResponse(List<ValidationResult> validationResults)
        {
            if (validationResults == null)
            {
                validationResults = new List<ValidationResult>();
            }

            ValidationResults = validationResults;
            Success = validationResults.Count == 0;
            Message = validationResults.Count == 0 ? "OK" : "Validation Failed";
            Errors = validationResults
                .SelectMany(key => key.MemberNames
                    .Select(x => new ValidationError(x, key.ErrorMessage!, null!)))
                .Union(
                    validationResults
                        .Where(key => !key.MemberNames.Any())
                        .Select(key => new ValidationError("General", key.ErrorMessage!, null!))
                ).ToList();
        }

        public ValidationResponse(List<CustomValidationResult> validationResults)
        {
            ValidationResults = validationResults.Select(v => new ValidationResult(v.ErrorMessage, v.MemberNames)).ToList();
            Success = validationResults.Count == 0;
            Message = validationResults.Count == 0 ? "OK" : "Validation Failed";
            Errors = validationResults
                .SelectMany(key => key.MemberNames
                    .Select(x => new ValidationError(x, key.ErrorMessage!, key.StackTrace!)))
                .Union(
                    validationResults
                        .Where(key => !key.MemberNames.Any())
                        .Select(key => new ValidationError("General", key.ErrorMessage!, key.StackTrace!))
                ).ToList();
        }
    }
}
