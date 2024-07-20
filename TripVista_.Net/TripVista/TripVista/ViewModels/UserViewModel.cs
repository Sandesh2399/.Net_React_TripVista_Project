using System.ComponentModel.DataAnnotations;

namespace TripVista
{
    public class UserViewModel
    {
        public int UserId { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; } = null!;

        [StringLength(50)]
        public string LastName { get; set; } = null!;
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public string? ImageUrl { get; set; }
    }
}
