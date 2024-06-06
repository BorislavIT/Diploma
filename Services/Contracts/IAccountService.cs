using Microsoft.AspNetCore.Http;
using Server.DTOs;

namespace Services.Contracts
{
    public interface IAccountService
    {
        Task<AccountDTO> Login(HttpResponse httpResponse, LoginForm loginForm);

        Task<AccountDTO> Identify(HttpRequest httpRequest);

        Task<AccountDTO> Register(HttpResponse httpResponse, RegisterForm registerForm);
    }
}
