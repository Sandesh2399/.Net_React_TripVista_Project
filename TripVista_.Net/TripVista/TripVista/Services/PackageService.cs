
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using TripVista.Models;

namespace TripVista
{
    public class PackageService : IPackageService
    {
        private readonly IGenericService<TravelPackage> _genericService;
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly UploadSettings _uploadSettings;
        public PackageService(IGenericService<TravelPackage> genericService, AppDbContext appDbContext, IMapper mapper, IOptions<UploadSettings> uploadSettings)
        {
            _genericService = genericService;
            _appDbContext = appDbContext;
            _mapper = mapper;
            _uploadSettings = uploadSettings.Value;
        }

        public async Task<PackageAddResponse> AddPackage(PackageAddRequest packageAddRequest)
        {
            List<ValidationResult> validationResults = Helper.Validate(packageAddRequest);

            if (validationResults.Count > 0)
            {
                return new PackageAddResponse(validationResults);
            }
            var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Packages");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var addPackage = _mapper.Map<TravelPackage>(packageAddRequest);
            var response = await _genericService.AddWithSaveAsync(addPackage);

            var fileName = addPackage.PackageId + "_" + addPackage.PackageName + Path.GetExtension(packageAddRequest.Image.FileName);

            response.ImageUrl = "../../images/Packages/" + fileName;

            await _genericService.UpdateWithSaveAsync(response);


            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await packageAddRequest.Image.CopyToAsync(stream);
            }


            return new PackageAddResponse(validationResults) { PackageId = response.PackageId };
        }

        public async Task<PackageAddResponse> DeletePackage(int Id)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();

            var package = await _genericService.GetByIdAsync(Id);

            if (package == null)
            {
                validationResults.Add(new ValidationResult("Package not found"));
                return new PackageAddResponse(validationResults);
            }


            var response = _appDbContext.TravelPackages.Remove(package);

            await _appDbContext.SaveChangesAsync();


            return new PackageAddResponse(validationResults) { PackageId = package.PackageId };
        }

        public async Task<List<PackageViewModel>> GetPackages(int? destinationId, int? noOfPeople, int? minPrice, int? maxPrice)
        {
            var query = _appDbContext.TravelPackages.AsQueryable();

            if (destinationId != null && destinationId != 0)
            {
                query = query.Where(x => x.DestinationId == destinationId);
            }

            if (noOfPeople != null && noOfPeople != 0)
            {
                int requiredRooms = (int)Math.Ceiling(noOfPeople.Value / 4.0);

                // Subquery to get the total number of people in confirmed reservations for each hotel
                var hotelConfirmedReservations = _appDbContext.Reservations
                    .Where(r => r.Status == "Confirm" && r.DestinationId == destinationId)
                    .GroupBy(r => r.HotelId)
                    .Select(g => new
                    {
                        HotelId = g.Key,
                        TotalPeople = g.Sum(r => r.NoOfPeople)
                    });

                // Join the travel packages with the confirmed reservations to calculate available rooms
                if (hotelConfirmedReservations.ToList().Count > 0)
                {
                    query = query.Join(hotelConfirmedReservations,
                                       tp => tp.HotelId,
                                       hr => hr.HotelId,
                                       (tp, hr) => new { tp, hr })
                                 .Where(joined => joined.tp.Hotel.NumberOfRooms - (int)Math.Ceiling(joined.hr.TotalPeople / 4.0) >= requiredRooms)
                                 .Select(joined => joined.tp);
                }
            }

            if (minPrice != null && maxPrice != null && minPrice != 0 && maxPrice != 0)
            {
                query = query.Where(x => x.Price >= minPrice && x.Price <= maxPrice);
            }

            // Projection to PackageViewModel and execution
            var packages = await query.Select(x => new PackageViewModel
            {
                PackageId = x.PackageId,
                PackageName = x.PackageName,
                Description = x.Description,
                Price = x.Price,
                DurationDays = x.DurationDays,
                DestinationId = x.DestinationId,
                Destination = x.Destination.DestinationName,
                ImageUrl = x.ImageUrl,
                HotelId = x.HotelId,
                HotelDetails = new HotelDetails
                {
                    HotelId = x.Hotel.HotelId,
                    Name = x.Hotel.Name,
                    Address = x.Hotel.Address,
                    ZipCode = x.Hotel.ZipCode,
                    Email = x.Hotel.Email,
                    NumberOfRooms = x.Hotel.NumberOfRooms,
                    PhoneNumber = x.Hotel.PhoneNumber,
                    Rating = x.Hotel.Rating,
                    Amenities = x.Hotel.Amenities,
                    ImageUrl = x.Hotel.ImageUrl,
                    Website = x.Hotel.Website,
                }
            }).ToListAsync();


            return packages;
        }

        public async Task<PackageAddResponse> UpdatePackage(PackageAddRequest packageAddRequest)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();
            validationResults = Helper.Validate(packageAddRequest);

            var package = await _genericService.GetByIdAsync(packageAddRequest.PackageId);

            if (validationResults.Count > 0)
            {
                return new PackageAddResponse(validationResults);
            }

            if (package == null)
            {
                validationResults.Add(new ValidationResult("Package not found"));
                return new PackageAddResponse(validationResults);
            }

            package = _mapper.Map<TravelPackage>(packageAddRequest);
            var response = await _genericService.UpdateWithSaveAsync(package);

            if (packageAddRequest.Image != null)
            {
                var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Packages");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var fileName = packageAddRequest.PackageId + "_" + packageAddRequest.PackageName + Path.GetExtension(packageAddRequest.Image.FileName);

                var filePath = Path.Combine(uploadPath, fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath); // Replace existing file
                }

                var newImageUrl = "../../images/Packages/" + fileName;

                if (packageAddRequest.ImageUrl != null && packageAddRequest.ImageUrl.ToLower() != newImageUrl.ToLower())
                {
                    response.ImageUrl = newImageUrl;

                    await _genericService.UpdateWithSaveAsync(response);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await packageAddRequest.Image.CopyToAsync(stream);
                }
            }

            return new PackageAddResponse(validationResults) { PackageId = response.PackageId };
        }
    }
}
