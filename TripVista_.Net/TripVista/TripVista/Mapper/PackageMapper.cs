using AutoMapper;
using TripVista.Models;

namespace TripVista
{
    public class PackageMapper: Profile
    {
        public PackageMapper() 
        { 
            CreateMap<TravelPackage,PackageAddRequest>().ReverseMap();
        }
    }
}
