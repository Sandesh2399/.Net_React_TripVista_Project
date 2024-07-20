using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TripVista.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripVista.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService, AppDbContext appDbContext)
        {
            _userService = userService;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<LoginResponse> Login(LoginViewModel user)
        {
            var response = await _userService.Login(user);
            return response;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<UserRegistrationResponse> Register(UserRegisterRequestModel model)
        {
            var response = await _userService.Register(model);
            return response;
        }

        [HttpPut("UpdateUser")]
        public async Task<UserAddResponse> UpdateUser([FromForm] UserAddRequest request)
        {
            var response = await _userService.UpdateUser(request);
            return response;
        }

        [HttpGet("GetImageUrl/{userId}")]
        public async Task<string> GetImageUrl(int userId)
        {
            var url =  await _userService.GetImageUrl(userId);
            return url;
        }

        [HttpGet("GetUsers")]
        public async Task<List<UserViewModel>> GetUsers()
        {
            var response = await _userService.GetUsers();
            return response;
        }
    } 
}
