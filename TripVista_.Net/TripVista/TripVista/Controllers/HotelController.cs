using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TripVista.Interfaces;

namespace TripVista.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService hotelService;
        public HotelController(IHotelService hotelService)
        {
            this.hotelService = hotelService;
        }

        [HttpPost("AddHotel")]
        public async Task<HotelAddResponse> AddHotel([FromForm] HotelAddRequest hotelAddRequest)
        {
            var response = await hotelService.AddHotel(hotelAddRequest);
            return response;
        }

        [HttpDelete("DeleteHotel/{Id}")]
        public async Task<HotelAddResponse> DeleteHotel(int Id)
        {
            var response = await hotelService.DeleteHotel(Id);
            return response;
        }

        [HttpGet("GetHotels")]
        public async Task<List<HotelViewModel>> GetHotels()
        {
            var response = await hotelService.GetHotels();
            return response;
        }

        [HttpPut("UpdateHotel")]
        public async Task<HotelAddResponse> UpdateHotel([FromForm] HotelAddRequest hotelAddRequest)
        {
            var response = await hotelService.UpdateHotel(hotelAddRequest);
            return response;
        }

        [HttpPost("CheckHotelAvailability")]
        public async Task<bool> CheckHotelAvailability(HotelAvailability hotelAvailability)
        {
            var response = await hotelService.CheckHotelAvailability(hotelAvailability);
            return response;
        }
    }
}
