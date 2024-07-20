using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TripVista.Data;

namespace TripVista.Models;

public partial class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Destination> Destinations { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<PromotionalOffer> PromotionalOffers { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<ReservationStatus> ReservationStatuses { get; set; }

    public virtual DbSet<TravelPackage> TravelPackages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=BFL-LPT-7286\\SQLEXPRESS;Database=TripVista;Trusted_Connection=true;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Destination>(entity =>
        {
            entity.HasKey(e => e.DestinationId).HasName("PK__Destinat__DB5FE4CC70003F71");
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.HotelId).HasName("PK__Hotel__46023BBF1C54AD45");
        });

        modelBuilder.Entity<PromotionalOffer>(entity =>
        {
            entity.HasKey(e => e.OfferId).HasName("PK__Promotio__8EBCF0915F06839B");

            entity.HasOne(d => d.Package).WithMany(p => p.PromotionalOffers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Promotion__Packa__787EE5A0");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.ReservationId).HasName("PK__Reservat__B7EE5F246335FD88");

            entity.HasOne(d => d.Destination).WithMany(p => p.Reservations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reservati__Desti__7C4F7684");

            entity.HasOne(d => d.Hotel).WithMany(p => p.Reservations).HasConstraintName("FK__Reservati__Hotel__04E4BC85");

            entity.HasOne(d => d.Package).WithMany(p => p.Reservations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reservati__Packa__7D439ABD");

            entity.HasOne(d => d.User).WithMany(p => p.Reservations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reservati__UserI__7B5B524B");
        });

        modelBuilder.Entity<ReservationStatus>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PK__Reservat__C8EE2063A694D901");
        });

        modelBuilder.Entity<TravelPackage>(entity =>
        {
            entity.HasKey(e => e.PackageId).HasName("PK__TravelPa__322035CC1DECBED4");

            entity.HasOne(d => d.Destination).WithMany(p => p.TravelPackages)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TravelPac__Desti__75A278F5");

            entity.HasOne(d => d.Hotel).WithMany(p => p.TravelPackages).HasConstraintName("FK__TravelPac__Hotel__03F0984C");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C8ECAF0C8");

            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
