using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using TripVista.Data;
using TripVista.Models;

namespace TripVista
{
    public class ReservationService : IReservationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IGenericService<Reservation> _genericService;
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        public ReservationService(IGenericService<Reservation> genericService, AppDbContext appDbContext, IMapper mapper, IEmailService emailService, UserManager<ApplicationUser> userManager)
        {
            _genericService = genericService;
            _appDbContext = appDbContext;
            _mapper = mapper;
            _emailService = emailService;
            _userManager = userManager;
        }
        public async Task<ReservationAddResponse> BookReservation(ReservationAddRequest reservationAddRequest)
        {
            List<ValidationResult> validationResults = Helper.Validate(reservationAddRequest);

            if (validationResults.Count > 0)
            {
                return new ReservationAddResponse(validationResults);
            }
            var addReservation = _mapper.Map<Reservation>(reservationAddRequest);

            var reservationExits = await _appDbContext.Reservations.Include(i => i.Hotel).Where(r => r.ReservationId == reservationAddRequest.ReservationId).FirstOrDefaultAsync();

            var user = _userManager.Users.Where(u => u.UserId == reservationAddRequest.UserId).FirstOrDefault();

            var response = new Reservation();

            if (reservationExits != null)
            {
                var reservation = _mapper.Map<Reservation>(reservationAddRequest);
                response = await _genericService.UpdateWithSaveAsync(reservation);
            }
            else
            {
                response = await _genericService.AddWithSaveAsync(addReservation);
                var reservationAdded= await _appDbContext.Reservations.Include(i => i.Hotel).Where(r => r.ReservationId == response.ReservationId).FirstOrDefaultAsync();

                if (response != null && response.ReservationId != 0)
                {
                    var subject = "Your Travel Package Booking Confirmation";

                    string htmlTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "BookingConfirmTemplate.html");
                    string htmlTemplate = File.ReadAllText(htmlTemplatePath);

                    string html = htmlTemplate.Replace("{0}", reservationAddRequest.UserName);
                    html = html.Replace("{1}", reservationAddRequest.PackageName);
                    html = html.Replace("{2}", reservationAddRequest.Destination);
                    html = html.Replace("{3}", reservationAddRequest.PackageName);
                    html = html.Replace("{4}", reservationAdded.Hotel.Name);
                    html = html.Replace("{5}", reservationAdded.Hotel.Address);
                    html = html.Replace("{6}", reservationAdded.StartDate.ToString("dd MMMM yyyy"));
                    html = html.Replace("{7}", reservationAdded.EndDate.ToString("dd MMMM yyyy"));

                    _emailService.SendAsync(reservationAddRequest.UserEmail, subject, html);
                }
            }

            return new ReservationAddResponse(validationResults) { ReservationId = response.ReservationId };
        }

        public async Task<ReservationAddResponse> DeleteReservation(int Id)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();

            var reservation = await _genericService.GetByIdAsync(Id);

            if (reservation == null)
            {
                validationResults.Add(new ValidationResult("Reservation not found"));
                return new ReservationAddResponse(validationResults);
            }


            var response = _appDbContext.Reservations.Remove(reservation);

            await _appDbContext.SaveChangesAsync();


            return new ReservationAddResponse(validationResults) { ReservationId = reservation.ReservationId };
        }

        public async Task<List<ReservationViewModel>> GetReservations()
        {
            var reservation = _appDbContext.Reservations.Select(s => new ReservationViewModel
            {
                ReservationId = s.ReservationId,
                HotelId = s.HotelId,
                UserId = s.UserId,
                UserName = s.User.FirstName + " " + s.User.LastName,
                UserEmail = _userManager.Users.Where(f => f.UserId == s.UserId).FirstOrDefault().Email ?? string.Empty,
                DestinationId = s.DestinationId,
                Destination = s.Destination.DestinationName,
                PackageId = s.PackageId,
                PackageName = s.Package.PackageName,
                StartDate = s.StartDate.ToString("yyyy-MM-dd"),
                EndDate = s.EndDate.ToString("yyyy-MM-dd"),
                Status = s.Status,
                ReservationDate = s.ReservationDate.ToString("yyyy-MM-dd"),
                NoOfPeople = s.NoOfPeople,
                TotalPrice = s.TotalPrice,
            }).ToList();

            return reservation;
        }

        public async Task<ReservationAddResponse> UpdateReservation(ReservationAddRequest reservationAddRequest)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();
            validationResults = Helper.Validate(reservationAddRequest);

            var reservation = await _genericService.GetByIdAsync(reservationAddRequest.ReservationId);

            if (validationResults.Count > 0)
            {
                return new ReservationAddResponse(validationResults);
            }

            if (reservation == null)
            {
                validationResults.Add(new ValidationResult("Reservation not found"));
                return new ReservationAddResponse(validationResults);
            }

            reservation = _mapper.Map<Reservation>(reservationAddRequest);
            var response = await _genericService.UpdateWithSaveAsync(reservation);

            if(response != null && string.Equals(response.Status, "Cancel")) 
            {
                var subject = "Booking Cancellation";

                string htmlTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "EmailTemplate.html");
                string htmlTemplate = File.ReadAllText(htmlTemplatePath);

                string html = htmlTemplate.Replace("{0}", reservationAddRequest.UserName);
                html = html.Replace("{1}", reservationAddRequest.PackageName);
                html = html.Replace("{2}", reservationAddRequest.Destination);

                _emailService.SendAsync(reservationAddRequest.UserEmail, subject, html);
            }

            return new ReservationAddResponse(validationResults) { ReservationId = response.ReservationId };
        }
    }
}
