using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TripVista.Models;

public partial class PromotionalOffer
{
    [Key]
    public int OfferId { get; set; }

    [StringLength(255)]
    public string OfferName { get; set; } = null!;

    public string? Description { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal DiscountPercentage { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime StartDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime EndDate { get; set; }

    public int PackageId { get; set; }

    [ForeignKey("PackageId")]
    [InverseProperty("PromotionalOffers")]
    public virtual TravelPackage Package { get; set; } = null!;
}
