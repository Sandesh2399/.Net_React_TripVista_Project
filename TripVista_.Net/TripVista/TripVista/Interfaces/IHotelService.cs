namespace TripVista.Interfaces
{
    public interface IHotelService
    {
        Task<HotelAddResponse> AddHotel(HotelAddRequest hotelAddRequest);
        Task<List<HotelViewModel>> GetHotels();
        Task<HotelAddResponse> UpdateHotel(HotelAddRequest hotelAddRequest);
        Task<HotelAddResponse> DeleteHotel(int Id);
        Task<bool> CheckHotelAvailability(HotelAvailability hotelAvailability);
    }
}
