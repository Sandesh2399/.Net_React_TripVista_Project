using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripVista.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpPost("BookReservation")]
        public async Task<ReservationAddResponse> BookReservation(ReservationAddRequest reservationAddRequest)
        {
            var response = await _reservationService.BookReservation(reservationAddRequest);
            return response;
        }

        [HttpDelete("DeleteReservation/{Id}")]
        public async Task<ReservationAddResponse> DeleteReservation(int Id)
        {
            var response = await _reservationService.DeleteReservation(Id);
            return response;
        }

        [HttpGet("GetReservations")]
        public async Task<List<ReservationViewModel>> GetReservations()
        {
            var response = await _reservationService.GetReservations();
            return response;
        }

        [HttpPut("UpdateReservation")]
        public async Task<ReservationAddResponse> UpdateReservation(ReservationAddRequest reservationAddRequest)
        {
            var response = await _reservationService.UpdateReservation(reservationAddRequest);
            return response;
        }
    }
}
