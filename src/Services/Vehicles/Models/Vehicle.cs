namespace Vehicles.Api.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int VehicleTypeId { get; set; }
        public int ClassificationId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public bool IsAutomatic { get; set; }
        public decimal PriceRate { get; set; }
        public int AvailableStock { get; set; }
        public int ReservedThreshold { get; set; }
        public bool Unavailable { get; set; }
        public string ImageName { get; set; }
        public string ImageUrl { get; set; }

        public VehicleType VehicleType { get; set; }
        public Classification Classification { get; set; }
    }
}