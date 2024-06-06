using Microsoft.AspNetCore.Http;
using Services.Contracts;

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
    }
}
