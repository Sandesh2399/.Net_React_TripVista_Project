using AutoMapper;
using TripVista.Models;

namespace TripVista
{
    public class DestinationMapper : Profile
    {
        public DestinationMapper() { 
            CreateMap<Destination, DestinationAddRequest>().ReverseMap();
        }
    }
}
