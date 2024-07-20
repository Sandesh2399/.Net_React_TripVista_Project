using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class UserAddRequest
    {
        public int UserId { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; } = null!;

        [StringLength(50)]
        public string LastName { get; set; } = null!;

        public bool IsActive { get; set; }

        [StringLength(255)]
        public string? ImageUrl { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public IFormFile? Image { get; set; }
    }
}
