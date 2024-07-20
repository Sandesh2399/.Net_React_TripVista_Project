using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class UserRegistrationResponse : BaseResponse
    {
        public UserRegistrationResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public string NewUserId { get; set; } = string.Empty;
        public List<IdentityError> Errors { get; set; } = new List<IdentityError>();
    }
}
