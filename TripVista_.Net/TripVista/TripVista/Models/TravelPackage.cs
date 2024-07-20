using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TripVista.Models;

public partial class TravelPackage
{
    [Key]
    public int PackageId { get; set; }

    [StringLength(255)]
    public string PackageName { get; set; } = null!;

    public string? Description { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    public int DurationDays { get; set; }

    public int DestinationId { get; set; }

    [StringLength(255)]
    public string? ImageUrl { get; set; }

    [Column("HotelID")]
    public int? HotelId { get; set; }

    [ForeignKey("DestinationId")]
    [InverseProperty("TravelPackages")]
    public virtual Destination Destination { get; set; } = null!;

    [ForeignKey("HotelId")]
    [InverseProperty("TravelPackages")]
    public virtual Hotel? Hotel { get; set; }

    [InverseProperty("Package")]
    public virtual ICollection<PromotionalOffer> PromotionalOffers { get; set; } = new List<PromotionalOffer>();

    [InverseProperty("Package")]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
