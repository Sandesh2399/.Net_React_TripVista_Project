using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripVista.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {  
        private readonly IDestinationService _destinationService;

        public DestinationController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        [HttpPost("AddDestination")]
        public async Task<DestinationAddResponse> AddDestination([FromForm] DestinationAddRequest destinationAddRequest)
        {
            var response = await _destinationService.AddDestination(destinationAddRequest);
            return response;
        }

        [HttpGet("GetDestinations")]
        public async Task<List<DestinationViewModel>> GetDestinations()
        {
            var response = await _destinationService.GetDestinations();
            return response;
        }

        [HttpPut("UpdateDestination")]
        public async Task<DestinationAddResponse> UpdateDestination([FromForm]DestinationAddRequest destinationAddRequest)
        {
            var response = await _destinationService.UpdateDestination(destinationAddRequest);
            return response;
        }

        [HttpDelete("DeleteDestination/{Id}")]
        public async Task<DestinationAddResponse> DeleteDestination(int Id)
        {
            var response = await _destinationService.DeleteDestination(Id);
            return response;
        }
    }
}
