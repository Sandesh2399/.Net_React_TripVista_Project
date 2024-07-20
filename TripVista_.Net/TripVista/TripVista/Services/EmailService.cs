using Microsoft.Extensions.Options;
using Org.BouncyCastle.Cms;
using System.Net.Mail;
using System.Net;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace TripVista
{
    public interface IEmailService
    {
        void SendAsync(string to, string subject, string html, string? from = null);
    }

    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> appSettings)
        {
            _emailSettings = appSettings.Value;
        }

        public void SendAsync(string to, string subject, string html, string? from = null)
        {
            using (SmtpClient smtpClient = new SmtpClient(_emailSettings.SmtpServer, 587))
            {
                smtpClient.EnableSsl = true; // Enable SSL
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(_emailSettings.UserName, _emailSettings.Password);

                // Create a MailMessage object
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(_emailSettings.SenderEmail);
                mailMessage.To.Add(to);
                mailMessage.Subject = subject;
                mailMessage.Body = html;
                mailMessage.IsBodyHtml = true;

                try
                {
                    // Send the email
                    smtpClient.Send(mailMessage);
                    Console.WriteLine("Email sent successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send email: {ex.Message}");
                }
            }
        }
    }
}
