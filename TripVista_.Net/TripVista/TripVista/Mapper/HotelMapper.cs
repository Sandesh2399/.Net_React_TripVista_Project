using AutoMapper;
using TripVista.Models;

namespace TripVista
{
    public class HotelMapper : Profile
    {
        public HotelMapper()
        {
            CreateMap<HotelAddRequest, Hotel>().ReverseMap();
        }
    }
}
