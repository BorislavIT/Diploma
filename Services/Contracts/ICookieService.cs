﻿using Microsoft.AspNetCore.Http;

namespace Services.Contracts
{
    public interface ICookieService
    {
        void CreateCookie(HttpResponse response, string key, string value, int expireTime);
    }
}
