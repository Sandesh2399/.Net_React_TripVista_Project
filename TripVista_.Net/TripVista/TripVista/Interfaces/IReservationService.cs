namespace TripVista
{
    public interface IReservationService
    {
        Task<ReservationAddResponse> BookReservation(ReservationAddRequest reservationAddRequest);
        Task<List<ReservationViewModel>> GetReservations();
        Task<ReservationAddResponse> UpdateReservation(ReservationAddRequest reservationAddRequest);
        Task<ReservationAddResponse> DeleteReservation(int Id);
    }
}
