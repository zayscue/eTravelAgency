using Microsoft.EntityFrameworkCore;
using Vehicles.Api.Models;

namespace Vehicles.Api.Data
{
    public class VehicleCatalogContext : DbContext
    {
        public VehicleCatalogContext(DbContextOptions<VehicleCatalogContext> options) : base(options)
        {

        }

        public DbSet<Classification> Classifications { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Classification entity setup
            builder.Entity<Classification>()
                .HasKey(x => x.Id);
            builder.Entity<Classification>()
                .Property(x => x.Description)
                .IsRequired();

            // VehicleType entity setup
            builder.Entity<VehicleType>()
                .HasKey(x => x.Id);
            builder.Entity<VehicleType>()
                .Property(x => x.Description)
                .IsRequired();

            // Vehicle entity setup
            builder.Entity<Vehicle>()
                .HasKey(x => x.Id);
            builder.Entity<Vehicle>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<Vehicle>()
                .HasOne(x => x.Classification);
            builder.Entity<Vehicle>()
                .HasOne(x => x.VehicleType);
            builder.Entity<Vehicle>()
                .Property(x => x.Make)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.Model)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.AvailableStock)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.PriceRate)
                .HasColumnType("decimal(5, 2)")
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.ReservedThreshold)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.Year)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.Unavailable)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.IsAutomatic)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.ClassificationId)
                .IsRequired();
            builder.Entity<Vehicle>()
                .Property(x => x.VehicleTypeId)
                .IsRequired();
        }
    }
}