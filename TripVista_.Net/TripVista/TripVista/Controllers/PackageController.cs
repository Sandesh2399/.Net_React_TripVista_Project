using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripVista.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackageService _packageService;
        public PackageController(IPackageService packageService)
        {
            _packageService = packageService;
        }
        [HttpPost("AddPackage")]
        public async Task<PackageAddResponse> AddPackage(PackageAddRequest packageAddRequest)
        {
            var response = await _packageService.AddPackage(packageAddRequest);
            return response;
        }

        [HttpDelete("DeletePackage/{Id}")]
        public async Task<PackageAddResponse> DeletePackage(int Id)
        {
            var response = await _packageService.DeletePackage(Id);
            return response;
        }

        [HttpGet("GetPackages")]
        public async Task<List<PackageViewModel>> GetPackages([FromQuery] int? destinationId, [FromQuery] int? noOfPeople, [FromQuery] int? minPrice, [FromQuery] int? maxPrice)
        {
            var response = await _packageService.GetPackages(destinationId,noOfPeople, minPrice, maxPrice);
            return response;
        }

        [HttpPut("UpdatePackage")]
        public async Task<PackageAddResponse> UpdatePackage(PackageAddRequest packageAddRequest)
        {
            var response = await _packageService.UpdatePackage(packageAddRequest);
            return response;
        }
    }
}
