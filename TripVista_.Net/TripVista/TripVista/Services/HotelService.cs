using AutoMapper;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using TripVista.Interfaces;
using TripVista.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace TripVista
{
    public class HotelService : IHotelService
    {
        private readonly IGenericService<Hotel> _genericService;
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly UploadSettings _uploadSettings;
        public HotelService(IGenericService<Hotel> genericService, AppDbContext appDbContext, IMapper mapper, IOptions<UploadSettings> uploadSettings)
        {
            _genericService = genericService;
            _appDbContext = appDbContext;
            _mapper = mapper;
            _uploadSettings = uploadSettings.Value;
        }

        public async Task<HotelAddResponse> AddHotel(HotelAddRequest hotelAddRequest)
        {
            List<ValidationResult> validationResults = Helper.Validate(hotelAddRequest);

            if (validationResults.Count > 0)
            {
                return new HotelAddResponse(validationResults);
            }
            var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Hotels");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var addHotel = _mapper.Map<Hotel>(hotelAddRequest);
            var response = await _genericService.AddWithSaveAsync(addHotel);

            if (hotelAddRequest.Image != null)
            {

                var fileName = addHotel.HotelId + "_" + addHotel.Name + Path.GetExtension(hotelAddRequest.Image.FileName);

                response.ImageUrl = "../../images/Hotels/" + fileName;

                await _genericService.UpdateWithSaveAsync(response);


                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await hotelAddRequest.Image.CopyToAsync(stream);
                }

            }

            return new HotelAddResponse(validationResults) { HotelId = response.HotelId };
        }

        public async Task<HotelAddResponse> DeleteHotel(int Id)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();

            var Hotel = await _genericService.GetByIdAsync(Id);

            if (Hotel == null)
            {
                validationResults.Add(new ValidationResult("Hotel not found"));
                return new HotelAddResponse(validationResults);
            }

            _appDbContext.Hotels.Remove(Hotel);

            await _appDbContext.SaveChangesAsync();


            return new HotelAddResponse(validationResults) { HotelId = Hotel.HotelId };
        }

        public async Task<List<HotelViewModel>> GetHotels()
        {
            var packages = _appDbContext.Hotels.Select(x => new HotelViewModel
            {
                HotelId = x.HotelId,
                Name = x.Name,
                Address = x.Address,
                Amenities = x.Amenities,
                CheckInTime = x.CheckInTime,
                CheckOutTime = x.CheckOutTime,
                Email = x.Email,
                ImageUrl = x.ImageUrl,
                NumberOfRooms = x.NumberOfRooms,
                PhoneNumber = x.PhoneNumber,
                Rating = x.Rating,
                Website = x.Website,
                ZipCode = x.ZipCode,
            }).ToList();

            return packages;
        }

        public async Task<HotelAddResponse> UpdateHotel(HotelAddRequest hotelAddRequest)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();
            validationResults = Helper.Validate(hotelAddRequest);

            var hotel = await _genericService.GetByIdAsync(hotelAddRequest.HotelId);

            if (validationResults.Count > 0)
            {
                return new HotelAddResponse(validationResults);
            }

            if (hotel == null)
            {
                validationResults.Add(new ValidationResult("Package not found"));
                return new HotelAddResponse(validationResults);
            }

            hotel = _mapper.Map<Hotel>(hotelAddRequest);
            var response = await _genericService.UpdateWithSaveAsync(hotel);

            if (hotelAddRequest.Image != null)
            {
                var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Hotels");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var fileName = hotelAddRequest.HotelId + "_" + hotelAddRequest.Name + Path.GetExtension(hotelAddRequest.Image.FileName);

                var filePath = Path.Combine(uploadPath, fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath); // Replace existing file
                }

                var newImageUrl = "../../images/Packages/" + fileName;

                if (hotelAddRequest.ImageUrl != null && hotelAddRequest.ImageUrl.ToLower() != newImageUrl.ToLower())
                {
                    response.ImageUrl = newImageUrl;

                    await _genericService.UpdateWithSaveAsync(response);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await hotelAddRequest.Image.CopyToAsync(stream);
                }
            }

            return new HotelAddResponse(validationResults) { HotelId = response.HotelId };
        }

        public async Task<bool> CheckHotelAvailability(HotelAvailability hotelAvailability)
        {
            int requiredRooms = (int)Math.Ceiling(hotelAvailability.NoOfPeople / 4.0);

            var hotelConfirmedReservations = _appDbContext.Reservations
                .Where(r => r.Status == "Confirm" && r.HotelId == hotelAvailability.HotelId && r.StartDate.Date <= DateTime.Parse(hotelAvailability.StartDate).Date && r.EndDate.Date> DateTime.Parse(hotelAvailability.StartDate).Date)
                .GroupBy(r => r.HotelId) 
                .Select(g => new
                {
                    HotelId = g.Key,
                    TotalPeople = g.Sum(r => r.NoOfPeople)
                });


            if (hotelConfirmedReservations.ToList().Count > 0)
            {
                var noOfRooms = _appDbContext.Hotels.Where(h => h.HotelId == hotelAvailability.HotelId).FirstOrDefault().NumberOfRooms;
                bool isAvailable = (noOfRooms - (int)Math.Ceiling(hotelConfirmedReservations.FirstOrDefault().TotalPeople / 4.0) >= requiredRooms);
                return isAvailable;
            }
            else
            {
                return true;
            }
        }
    }
}
