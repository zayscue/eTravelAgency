using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Vehicles.Catalog.Data.Repositories;
using Vehicles.Catalog.Models;

namespace Vehicles.Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IRepositoryBase<Vehicle> _vehicles;
        private readonly ILogger<VehiclesController> _logger;

        public VehiclesController(IRepositoryBase<Vehicle> vehicles, ILogger<VehiclesController> logger)
        {
            _vehicles = vehicles ?? throw new ArgumentNullException(nameof(vehicles));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public ActionResult<IEnumerable<Vehicle>> Get()
        {
            return Ok(_vehicles.GetAll().ToList());
        }
    }
}