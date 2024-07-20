using AutoMapper;
using System.Globalization;
using TripVista.Models;

namespace TripVista
{
    public class ReservationMapper : Profile
    {
        public ReservationMapper() {

            CreateMap<ReservationAddRequest,Reservation>().ForMember(dest => dest.ReservationDate,
                       opt => opt.MapFrom(src => DateTime.Parse(src.ReservationDate)))
            .ForMember(dest => dest.StartDate,
                       opt => opt.MapFrom(src => DateTime.Parse(src.StartDate)))
            .ForMember(dest => dest.EndDate,
                       opt => opt.MapFrom(src => DateTime.Parse(src.EndDate))).ForMember(dest => dest.Destination, opt => opt.Ignore())
            .ReverseMap();
        }
    }
}
