using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Vehicles.Api.Models;

namespace Vehicles.Api.Data.Repositories
{
    public class VehicleRepository : RepositoryBase<Vehicle>
    {
        public VehicleRepository(DbContext context) : base(context)
        {
            if(context == null) throw new ArgumentNullException(nameof(context));
        }

        public override IQueryable<Vehicle> GetAll()
        {
            return DbSet.AsNoTracking().Include(x => x.Classification).Include(x => x.VehicleType);
        }
    }
}