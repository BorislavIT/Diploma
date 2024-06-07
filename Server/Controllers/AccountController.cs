using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Services.Contracts;
using System.Text.Json;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("Identify", Name = "Identify")]
        public async Task<IActionResult> Identify()
        {
            var account = await _accountService.Identify(Request);

            return Ok(JsonSerializer.Serialize(account));
        }

        [HttpPost("Login", Name = "Login")]
        public async Task<IActionResult> Login(LoginForm loginForm)
        {
            var account = await _accountService.Login(Response, loginForm);
            return Ok(JsonSerializer.Serialize(account));
        }

        [HttpGet("Logout", Name = "Logout")]
        public async Task<IActionResult> Logout()
        {
            return Ok();
        }

        [HttpPost("Register", Name = "Register")]
        public async Task<IActionResult> Register(RegisterForm registerForm)
        {
            var account = await _accountService.Register(Response, registerForm);
            return Ok(JsonSerializer.Serialize(account));
        }
    }
}
