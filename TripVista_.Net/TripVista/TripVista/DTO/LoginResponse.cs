using System.ComponentModel.DataAnnotations;
using TripVista.Data;
using TripVista.Models;


namespace TripVista
{
    public class LoginResponse : BaseResponse
    {
        public LoginResponse(List<ValidationResult> validationResults) : base(validationResults)
        {
        }
        public string token { get; set; } = string.Empty;
        public string refreshToken { get; set; } = string.Empty;
        public string? role { get; set; }
        public UserViewModel? User { get; set; }
    }
}
