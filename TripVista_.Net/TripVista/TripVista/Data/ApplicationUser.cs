using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TripVista.Models;

namespace TripVista.Data
{
    public class ApplicationUser: IdentityUser
    {
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? user { get; set; }

    }
}
