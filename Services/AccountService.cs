using AutoMapper;
using Data;
using Data.Models;
using Data.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Services.Contracts;
using Services.Hashers;
using Services.TokenHandlers;

namespace Services
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _dbContext;
        private readonly ICookieService _cookieService;
        private readonly IMapper _mapper;

        private const int TOKEN_VALID_HOURS =24;

        public AccountService(AppDbContext dbContext, ICookieService cookieService, IMapper mapper)
        {
            _dbContext = dbContext;
            _cookieService = cookieService;
            _mapper = mapper;
        }

        public async Task<AccountDTO> Login(HttpResponse response, LoginForm loginForm)
        {
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Username == loginForm.Username);

            if (account == null || !PasswordHasher.VerifyPassword(loginForm.Password, account.Password))
            {
                throw new UnauthorizedAccessException("Invalid username or password.");

            }

            var authToken = JWTTokenHandler.GenerateToken(loginForm.Username, TOKEN_VALID_HOURS);

            account.Token = authToken;

            _dbContext.Accounts.Update(account);
            await _dbContext.SaveChangesAsync();

            _cookieService.CreateCookie(response, CookieNames.AUTH_TOKEN, authToken, TOKEN_VALID_HOURS);

            return _mapper.Map<AccountDTO>(account);
        }

        public async Task<AccountDTO> Identify(HttpRequest httpRequest)
        {
            var authToken = httpRequest.Cookies[CookieNames.AUTH_TOKEN];
            if (authToken == null)
            {
                throw new UnauthorizedAccessException("Invalid token.");
            }

            var (username, expires) = JWTTokenHandler.ValidateToken(authToken);

            if (expires < DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Token expired.");
            }

            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Username == username);
            if (account == null)
            {
                throw new UnauthorizedAccessException("Invalid token.");
            }

            return _mapper.Map<AccountDTO>(account);
        }

        public async Task<AccountDTO> Register(HttpResponse response, RegisterForm registerForm)
        {
            if (registerForm.Password != registerForm.ConfirmPassword)
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }

            var authToken = JWTTokenHandler.GenerateToken(registerForm.Username, TOKEN_VALID_HOURS);

            var account = new Account { Username = registerForm.Username, Password = PasswordHasher.HashPassword(registerForm.Password), Token = authToken, Role = Role.USER };

            await _dbContext.Accounts.AddAsync(account);
            await _dbContext.SaveChangesAsync();

            _cookieService.CreateCookie(response, CookieNames.AUTH_TOKEN, authToken, TOKEN_VALID_HOURS);

            return _mapper.Map<AccountDTO>(account);
        }
    }
}
