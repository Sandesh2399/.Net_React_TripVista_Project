
using AutoMapper;
using Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.XPath;
using TripVista.Models;

namespace TripVista
{
    public class DestinationService : IDestinationService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IGenericService<Destination> _destinationService;
        private readonly IMapper _mapper;
        private readonly UploadSettings _uploadSettings;
        public DestinationService(IGenericService<Destination> destinationService, IMapper mapper, AppDbContext appDbContext, IOptions<UploadSettings> uploadSettings)
        {
            _destinationService = destinationService;
            _mapper = mapper;
            _appDbContext = appDbContext;
            _uploadSettings = uploadSettings.Value;
        }
        public async Task<DestinationAddResponse> AddDestination(DestinationAddRequest destinationAddRequest)
        {

            List<ValidationResult> validationResults = Helper.Validate(destinationAddRequest);


            if (validationResults.Count > 0)
            {
                return new DestinationAddResponse(validationResults);
            }

            if (destinationAddRequest.Image == null || destinationAddRequest.Image.Length == 0)
            {
                validationResults.Add(new ValidationResult("No image uploaded"));
                return new DestinationAddResponse(validationResults);
            }

            var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Destinations");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var addDestination = _mapper.Map<Destination>(destinationAddRequest);
            var response = await _destinationService.AddWithSaveAsync(addDestination);


            var fileName = addDestination.DestinationId + "_" + destinationAddRequest.DestinationName + Path.GetExtension(destinationAddRequest.Image.FileName);

            var newImageUrl = "../../images/Destinations/" + fileName;


            response.ImageUrl = newImageUrl;


            await _destinationService.UpdateWithSaveAsync(response);


            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await destinationAddRequest.Image.CopyToAsync(stream);
            }

            return new DestinationAddResponse(validationResults) { DestinationId = response.DestinationId };
        }

        public async Task<DestinationAddResponse> DeleteDestination(int Id)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();

            var destination = await _destinationService.GetByIdAsync(Id);

            if (destination == null)
            {
                validationResults.Add(new ValidationResult("Destination not found"));
                return new DestinationAddResponse(validationResults);
            }

            _appDbContext.Destinations.Remove(destination);

            await _appDbContext.SaveChangesAsync();


            return new DestinationAddResponse(validationResults) { DestinationId = destination.DestinationId };
        }

        public async Task<List<DestinationViewModel>> GetDestinations()
        {
            var destinations = await _appDbContext.Destinations.Select(s => new DestinationViewModel
            {
                DestinationId = s.DestinationId,
                DestinationName = s.DestinationName,
                Description = s.Description,
                ImageUrl = s.ImageUrl,
                Location = s.Location,
            }).ToListAsync();

            return destinations;
        }

        public async Task<DestinationAddResponse> UpdateDestination(DestinationAddRequest destinationAddRequest)
        {

            List<ValidationResult> validationResults = new List<ValidationResult>();
            validationResults = Helper.Validate(destinationAddRequest);

            var destination = await _destinationService.GetByIdAsync(destinationAddRequest.DestinationId);

            if (validationResults.Count > 0)
            {
                return new DestinationAddResponse(validationResults);
            }

            if (destination == null)
            {
                validationResults.Add(new ValidationResult("Destination not found"));
                return new DestinationAddResponse(validationResults);
            }

            destination = _mapper.Map<Destination>(destinationAddRequest);
            var response = await _destinationService.UpdateWithSaveAsync(destination);

            if (destinationAddRequest.Image != null)
            {
                var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Destinations");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var fileName = destinationAddRequest.DestinationId + "_" + destinationAddRequest.DestinationName + Path.GetExtension(destinationAddRequest.Image.FileName);

                var filePath = Path.Combine(uploadPath, fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath); // Replace existing file
                }

                var newImageUrl = "../../images/Destinations/" + fileName;

                if (destinationAddRequest.ImageUrl != null &&  string.Equals(destinationAddRequest.ImageUrl,newImageUrl))
                {
                    response.ImageUrl = "../../images/Destinations/" + fileName;

                    await _destinationService.UpdateWithSaveAsync(response);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await destinationAddRequest.Image.CopyToAsync(stream);
                }
            }


            return new DestinationAddResponse(validationResults) { DestinationId = response.DestinationId };
        }
    }
}
