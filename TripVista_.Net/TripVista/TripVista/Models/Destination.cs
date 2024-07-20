using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TripVista.Models;

public partial class Destination
{
    [Key]
    public int DestinationId { get; set; }

    [StringLength(255)]
    public string DestinationName { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(255)]
    public string? Location { get; set; }

    [StringLength(255)]
    public string? ImageUrl { get; set; }

    [InverseProperty("Destination")]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    [InverseProperty("Destination")]
    public virtual ICollection<TravelPackage> TravelPackages { get; set; } = new List<TravelPackage>();
}
