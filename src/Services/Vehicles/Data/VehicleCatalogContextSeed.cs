using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Polly;
using Vehicles.Api.Models;

namespace Vehicles.Api.Data
{
    public class VehicleCatalogContextSeed
    {

        public async Task SeedAsync(VehicleCatalogContext context, ILogger<VehicleCatalogContextSeed> logger)
        {
            var policy = CreatePolicy(logger, nameof(VehicleCatalogContextSeed));

            await policy.ExecuteAsync(async () => 
            {
                context.Database.OpenConnection();
                try
                {
                    if(!context.Classifications.Any())
                    {
                        context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Classifications ON");
                        await context.Classifications.AddRangeAsync(
                            GetPreconfiguredClassifications())
                        ;
                        await context.SaveChangesAsync();
                        context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Classifications OFF");
                    }

                    if(!context.VehicleTypes.Any())
                    {
                        context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.VehicleTypes ON");
                        await context.VehicleTypes.AddRangeAsync(
                            GetPreconfiguredVehicleTypes()
                        );
                        await context.SaveChangesAsync();
                        context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.VehicleTypes OFF");
                    }

                    if(!context.Vehicles.Any())
                    {
                        await context.Vehicles.AddRangeAsync(
                            GetPreconfiguredVehicles()
                        );
                        await context.SaveChangesAsync();
                    }
                }
                finally
                {
                    context.Database.CloseConnection();
                }
            });
        }

        private IEnumerable<Classification> GetPreconfiguredClassifications()
        {
            return new List<Classification>()
            {
                new Classification()
                {
                    Id = 1,
                    Description = "Economy"
                },
                new Classification()
                {
                    Id = 2,
                    Description = "Compact"
                },
                new Classification()
                {
                    Id = 3,
                    Description = "Intermediate"
                },
                new Classification()
                {
                    Id = 4,
                    Description = "Standard"
                },
                new Classification()
                {
                    Id = 5,
                    Description = "Full Size"
                },
                new Classification()
                {
                    Id = 6,
                    Description = "Premium"
                },
                new Classification()
                {
                    Id = 7,
                    Description = "Premium Special"
                },
                new Classification()
                {
                    Id = 8,
                    Description = "Luxury"
                },
                new Classification()
                {
                    Id = 9,
                    Description = "Convertible"
                },
                new Classification()
                {
                    Id = 10,
                    Description = "Standard Elite"
                },
                new Classification()
                {
                    Id = 11,
                    Description = "Full Size Elite"
                },
                new Classification()
                {
                    Id = 12,
                    Description = "Premium Elite"
                },
                new Classification()
                {
                    Id = 13,
                    Description = "Standard Hybrid"
                },
                new Classification()
                {
                    Id = 14,
                    Description = "Full Size Hybrid"
                },
                new Classification()
                {
                    Id = 15,
                    Description = "Sporty"
                },
                new Classification()
                {
                    Id = 16,
                    Description = "Intermediate Electric"
                }
            };
        }

        private IEnumerable<VehicleType> GetPreconfiguredVehicleTypes()
        {
            return new List<VehicleType>()
            {
                new VehicleType()
                {
                    Id = 1,
                    Description = "Cars"
                },
                new VehicleType()
                {
                    Id = 2,
                    Description = "SUVs"
                },
                new VehicleType()
                {
                    Id = 3,
                    Description = "Trucks"
                },
                new VehicleType()
                {
                    Id = 4,
                    Description = "Minivans & Vans"
                },
                new VehicleType()
                {
                    Id = 5,
                    Description = "Exotic Cars"
                }
            };
        }

        private IEnumerable<Vehicle> GetPreconfiguredVehicles()
        {
            return new List<Vehicle>()
            {
                new Vehicle()
                {
                    ClassificationId = 2,
                    VehicleTypeId = 2,
                    Make = "Ford",
                    Model = "Eco Sport",
                    Year = 2014,
                    PriceRate = 69.98m,
                    IsAutomatic = true,
                    AvailableStock = 20,
                    ReservedThreshold = 3,
                    Unavailable = false,              
                },
                new Vehicle()
                {
                    ClassificationId = 6,
                    VehicleTypeId = 1,
                    Make = "Nissan",
                    Model = "Maxima",
                    Year = 2016,
                    PriceRate = 57.99m,
                    IsAutomatic = true,
                    AvailableStock = 5,
                    ReservedThreshold = 1,
                    Unavailable = false,
                },
                new Vehicle()
                {
                    ClassificationId = 4,
                    VehicleTypeId = 2,
                    Make = "Hyundai",
                    Model = "Santa Fe",
                    Year = 2015,
                    PriceRate = 82.99m,
                    IsAutomatic = true,
                    AvailableStock = 10,
                    ReservedThreshold = 2,
                    Unavailable = false,
                },
                new Vehicle()
                {
                    ClassificationId = 6,
                    VehicleTypeId = 2,
                    Make = "Chevy",
                    Model = "Suburban",
                    Year = 2017,
                    PriceRate = 157.99m,
                    IsAutomatic = true,
                    AvailableStock = 15,
                    ReservedThreshold = 3,
                    Unavailable = false,
                },
                new Vehicle()
                {
                    ClassificationId = 9,
                    VehicleTypeId = 1,
                    Make = "Ford",
                    Model = "Mustang",
                    Year = 2018,
                    PriceRate = 240.00m,
                    IsAutomatic = true,
                    AvailableStock = 7,
                    ReservedThreshold = 1,
                    Unavailable = false,
                }
            };
        }

        private Policy CreatePolicy(ILogger<VehicleCatalogContextSeed> logger, string prefix, int retries = 3)
        {
            return Policy.Handle<SqlException>().
                WaitAndRetryAsync(
                    retryCount: retries,
                    sleepDurationProvider: retry => TimeSpan.FromSeconds(5),
                    onRetry: (exception, timeSpan, retry, ctx) => 
                    {
                        logger.LogTrace($"[{prefix}] Exception {exception.GetType().Name} with message ${exception.Message} detected on attempt {retry} of {retries}");
                    }
            );
        }
    }
}