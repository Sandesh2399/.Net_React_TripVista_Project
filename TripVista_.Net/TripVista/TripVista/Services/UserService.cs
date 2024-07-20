
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.Xml;
using System.Text;
using TripVista.Data;
using TripVista.Models;

namespace TripVista
{
    public class UserService : IUserService
    {
        private readonly IGenericService<User> _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly UploadSettings _uploadSettings;
        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager, AppDbContext appDbContext, IGenericService<User> userService, IMapper mapper, IOptions<UploadSettings> uploadSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _appDbContext = appDbContext;
            _userService = userService;
            _mapper = mapper;
            _uploadSettings = uploadSettings.Value;
        }

        public async Task<LoginResponse> Login(LoginViewModel user)
        {
            //NW  - PURPOSE
            List<ValidationResult> validationResults = Helper.Validate(user);

            if (validationResults.Count > 0)
                return new LoginResponse(validationResults);

            //DIFF NW
            var userExits = await _userManager.Users.Where(u => u.Email == user.Email).FirstOrDefaultAsync();

            if (userExits == null)
            {
                validationResults.Add(new ValidationResult(UserConstants.UserNotFound));
                return new LoginResponse(validationResults);
            }

            var userModel = _appDbContext.Users.Select(s => new UserViewModel
            {
                UserId = s.UserId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = userExits.Email,
                PhoneNumber = userExits.PhoneNumber,
                IsActive = s.IsActive,
                ImageUrl = s.ImageUrl

            }).FirstOrDefault(u => u.UserId == userExits.UserId);


            var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, user.RememberMe, false);

            if (result.Succeeded)
            {
                var accessToken = await GenerateAccessToken(userExits);

                var refreshToken = await GenerateRefreshToken(userExits);

                await _userManager.SetAuthenticationTokenAsync(userExits, TokenOptions.DefaultProvider, "RefreshToken", refreshToken);

                var roles = await _userManager.GetRolesAsync(userExits);

                string roleName = roles.FirstOrDefault() ?? string.Empty;

                return new LoginResponse(validationResults) { User = userModel, token = accessToken, refreshToken = refreshToken, role = roleName };
            }
            else
            {
                validationResults.Add(new ValidationResult(UserConstants.InvalidLogin));
                return new LoginResponse(validationResults);
            }
        }

        public async Task<UserRegistrationResponse> Register(UserRegisterRequestModel model)
        {
            List<ValidationResult> validationResults = Helper.Validate(model);

            if (validationResults.Count > 0)
                return new UserRegistrationResponse(validationResults);

            IdentityResult roleCreationResult = await EnsureRoleExistsAsync(model.Role);

            if (!roleCreationResult.Succeeded)
                return new UserRegistrationResponse(validationResults) { Errors = roleCreationResult.Errors.ToList() };

            var addUserResponse = await _userService.AddWithSaveAsync(new User { FirstName = model.FirstName, LastName = model.LastName, IsActive = true });

            if (addUserResponse == null)
            {

            }

            var user = new ApplicationUser
            {
                UserId = addUserResponse.UserId,
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            IdentityResult userCreationResult = await CreateUserWithRoleAsync(user, model.Role, model.Password);

            if (!userCreationResult.Succeeded)
                return new UserRegistrationResponse(validationResults) { Errors = userCreationResult.Errors.ToList() };

            ApplicationUser? createdUser = await _userManager.FindByEmailAsync(model.Email);

            if (createdUser == null)
                return new UserRegistrationResponse(validationResults) { Errors = userCreationResult.Errors.ToList() };

            List<Claim> claims = CreateClaims(model, createdUser);
            await _userManager.AddClaimsAsync(createdUser, claims);

            return new UserRegistrationResponse(validationResults) { NewUserId = createdUser.Id };
        }

        public async Task<UserAddResponse> UpdateUser(UserAddRequest request)
        {
            List<ValidationResult> validationResults = Helper.Validate(request);

            if (validationResults.Count > 0)
                return new UserAddResponse(validationResults);

            var appUser = _userManager.Users.FirstOrDefault(f => f.UserId == request.UserId);

            if (appUser == null)
            {
                validationResults.Add(new ValidationResult(UserConstants.UserNotFound));
                return new UserAddResponse(validationResults);
            }

            var user = _appDbContext.Users.FirstOrDefault(f => f.UserId == request.UserId);

            user = _mapper.Map<User>(request);

            appUser.Email = request.Email;
            appUser.PhoneNumber = request.PhoneNumber;
            appUser.UserName = request.Email;

            var appUserSave = await _userManager.UpdateAsync(appUser);

            if (appUserSave.Succeeded)
            {
                if (request.Image != null)
                {
                    var uploadPath = Path.Combine(_uploadSettings.UploadPath, "Profiles");

                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }

                    var fileName = request.UserId + "_" + request.FirstName + request.Image.FileName;

                    var filePath = Path.Combine(uploadPath, fileName);

                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath); // Replace existing file
                    }

                    var newImageUrl = "../../images/Profiles/" + fileName;

                    if (request.ImageUrl != null && request.ImageUrl.ToLower() != newImageUrl.ToLower())
                    {
                        user.ImageUrl = "../../images/Profiles/" + fileName;
                    }

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await request.Image.CopyToAsync(stream);
                    }

                }

                var userSave = await _userService.UpdateWithSaveAsync(user);

                return new UserAddResponse(validationResults) { UserId = userSave.UserId };
            }
            else
            {
                return new UserAddResponse(validationResults) { Errors = appUserSave.Errors.ToList() }; ;
            }
        }
        public async Task<string> GetImageUrl(int userId)
        {
            var url = _appDbContext.Users.FirstOrDefault(u => u.UserId == userId)?.ImageUrl ?? "";

            return url;
        }

        public async Task<List<UserViewModel>> GetUsers()
        {
            var users = _userManager.Users.Join(_appDbContext.Users, u => u.UserId,
                pu => pu.UserId, (u, pu) => new UserViewModel
                {
                    UserId = u.UserId,
                    FirstName = pu.FirstName,
                    LastName = pu.LastName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    ImageUrl = pu.ImageUrl,
                    IsActive = pu.IsActive,
                }).ToList();

            return users;
        }

        private async Task<bool> UserRoleAssign(ApplicationUser user, string role)
        {
            var roleExists = await _roleManager.RoleExistsAsync(role);

            if (roleExists)
            {
                var isInRole = await _userManager.IsInRoleAsync(user, role);

                if (!isInRole)
                {
                    var roles = await _userManager.GetRolesAsync(user);

                    foreach (var r in roles)
                    {
                        await _userManager.RemoveFromRoleAsync(user, r);
                    };

                    var roleResult = await _userManager.AddToRoleAsync(user, role);

                    if (roleResult.Succeeded)
                    {
                        await ReplaceUserClaimAsync(user, ClaimTypes.Role, role);
                    }

                    return roleResult.Succeeded;
                }
                else
                {
                    return isInRole;
                }
            }
            else return true;
        }

        private async Task<IdentityResult> ReplaceUserClaimAsync(ApplicationUser user, string claimType, string claimValue)
        {
            var claims = await _userManager.GetClaimsAsync(user);
            var oldClaim = claims.FirstOrDefault(c => c.Type == claimType);
            var newClaim = new Claim(claimType, claimValue);

            if (oldClaim != null)
            {
                return await _userManager.ReplaceClaimAsync(user, oldClaim, newClaim);
            }
            else
            {
                return await _userManager.AddClaimAsync(user, newClaim);
            }
        }

        private async Task<IdentityResult> EnsureRoleExistsAsync(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
                return await _roleManager.CreateAsync(new IdentityRole(role));

            return IdentityResult.Success;
        }

        private async Task<IdentityResult> CreateUserWithRoleAsync(ApplicationUser user, string role, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
                return await _userManager.AddToRoleAsync(user, role);

            return result;
        }

        private static List<Claim> CreateClaims(UserRegisterRequestModel model, ApplicationUser user)
        {
            return new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, $"{model.FirstName} {model.LastName}"),
                        new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                        new Claim(ClaimTypes.Role, model.Role ?? string.Empty),
                        new Claim(UserConstants.UserIdClaim, user.Id ?? "0"),
                    };
        }

        private static JwtSecurityToken GenerateRefreshTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var expiry = DateTime.Now.AddDays(7);
            var tokenOptions = new JwtSecurityToken(
                issuer: UserConstants.Issuer,
                audience: "https://localhost:7046",
                claims: claims,
                expires: expiry,
                signingCredentials: signingCredentials);

            return tokenOptions;
        }

        private async Task<string> GenerateRefreshToken(ApplicationUser user)
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims(user);
            var refreshTokenOptions = GenerateRefreshTokenOptions(signingCredentials, claims);
            var refRefreshToken = new JwtSecurityTokenHandler().WriteToken(refreshTokenOptions);
            return refRefreshToken;
        }

        private static (JwtSecurityToken, DateTime) GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var expiry = DateTime.Now.AddHours(1);
            var tokenOptions = new JwtSecurityToken(
                issuer: UserConstants.Issuer,
                audience: "https://localhost:7046",
                claims: claims,
                expires: expiry,
                notBefore: DateTime.Now,
                signingCredentials: signingCredentials);

            return (tokenOptions, expiry);
        }

        private async Task<List<Claim>> GetClaims(ApplicationUser user)
        {
            var claims = await _userManager.GetClaimsAsync(user);

            return claims.ToList();
        }

        private static SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(UserConstants.PHCSecretKey);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<string> GenerateAccessToken(ApplicationUser user)
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims(user);
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions.Item1);
            return accessToken;
        }
    }
}
