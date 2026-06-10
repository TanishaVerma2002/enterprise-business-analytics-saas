using Microsoft.AspNetCore.Mvc;
using EnterpriseAnalytics.API.DTOs;
using EnterpriseAnalytics.API.Models;
using EnterpriseAnalytics.API.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EnterpriseAnalytics.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly AppDbContext _context;

        //JWT Login
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context,IConfiguration configuration)  //dependency injection
        {
            _context = context;          //database context
            _configuration = configuration;   //configuration context
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterUserDTO request)
        {
            var existingUser =
                _context.Users
                .FirstOrDefault(
                    u => u.email.ToLower()
                    ==
                    request.Email.ToLower()
                );

            if (existingUser != null)
            {
                return BadRequest(new
                {
                    Message =
                        "Email already registered"
                });
            }

            var user = new User
            {
                Name = request.Name,

                email = request.Email,

                PasswordHash =
                    BCrypt.Net.BCrypt
                    .HashPassword(
                        request.Password
                    ),

                Role = request.Role
            };

            _context.Users.Add(user);

            _context.SaveChanges();

            return Ok(new
            {
                Message =
                    "Registration Successful"
            });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginUserDTO request)
        {
            var user = _context.Users.FirstOrDefault(u=>u.email==request.Email);
            if(user ==null)
            {
                return BadRequest(new
                {
                    Message = "User not found"
                });
            }
            bool PasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if(!PasswordValid)
            {
                return BadRequest(new
                {
                    Message = "Incorrect Password"
                });
            }
             //JWT Bearer code

            var claims  = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.Role, user.Role)                
            };
            
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["JWT:Key"]!
                )  
            );
            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );
            var token = new JwtSecurityToken(
            issuer: _configuration["JWT:Issuer"],

            audience: _configuration["JWT:Audience"],

            claims: claims,

            expires: DateTime.Now.AddHours(2),

            signingCredentials: credentials
            );

            var jwtToken = new JwtSecurityTokenHandler()
                .WriteToken(token);

            return Ok(new
            {
                Token = jwtToken,
                Role = user.Role
            });
        }
    }

    
}