using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TripVista.Models;

[Table("ReservationStatus")]
[Index("StatusName", Name = "UQ__Reservat__05E7698AABB477F5", IsUnique = true)]
public partial class ReservationStatus
{
    [Key]
    public int StatusId { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;
}
