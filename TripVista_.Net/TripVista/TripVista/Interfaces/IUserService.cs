namespace TripVista
{
    public interface IUserService
    {
        Task<LoginResponse> Login(LoginViewModel user);
        Task<UserRegistrationResponse> Register(UserRegisterRequestModel model);
        Task<UserAddResponse> UpdateUser(UserAddRequest request);
        Task<string> GetImageUrl(int userId);
        Task<List<UserViewModel>> GetUsers();
    }
}
