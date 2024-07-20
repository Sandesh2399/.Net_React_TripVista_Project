using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TripVista.Models;

public partial class Reservation
{
    [Key]
    public int ReservationId { get; set; }

    public int UserId { get; set; }

    public int DestinationId { get; set; }

    public int PackageId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime ReservationDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime StartDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime EndDate { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = null!;

    [Column("HotelID")]
    public int? HotelId { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal TotalPrice { get; set; }

    public int NoOfPeople { get; set; }

    [ForeignKey("DestinationId")]
    [InverseProperty("Reservations")]
    public virtual Destination Destination { get; set; } = null!;

    [ForeignKey("HotelId")]
    [InverseProperty("Reservations")]
    public virtual Hotel? Hotel { get; set; }

    [ForeignKey("PackageId")]
    [InverseProperty("Reservations")]
    public virtual TravelPackage Package { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Reservations")]
    public virtual User User { get; set; } = null!;
}
