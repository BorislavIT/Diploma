using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Services.Contracts;
using Services.TokenHandlers;

namespace Services
{
    public class CookieService : ICookieService
    {
        public void CreateCookie(HttpResponse response, string key, string value, int expireTime)
        {
            CookieOptions option = new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(expireTime),
                SameSite = SameSiteMode.None,
                Secure = true
            };
            response.Cookies.Append(key, value, option);
        }

        public (string username, DateTime expires) GetAuthTokenCookie(HttpRequest request)
        {
            var authCookie = request.Cookies[CookieNames.AUTH_TOKEN];

            var (username, expires) = JWTTokenHandler.ValidateToken(authCookie);

            return (username, expires);
        }
    }
}
