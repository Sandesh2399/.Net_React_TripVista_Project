using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class UserAddResponse : BaseResponse
    {
        public UserAddResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public int UserId { get; set; }
        public List<IdentityError> Errors { get; set; } = new List<IdentityError>();
    }
}
