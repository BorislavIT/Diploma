using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.TokenHandlers
{
    public static class JWTTokenHandler
    {
        // This is here for ease of access, obv shouldn't be here in a real application
        private static readonly string SECRET_KEY = "K29vG93uK3Uoq3o+VzRpQQ+aJD0LdYWw6h3aG8fclXc=";

        public static string GenerateToken(string username, int validHours)
        {
            var key = Encoding.ASCII.GetBytes(SECRET_KEY);
            var expirationTime = DateTimeOffset.UtcNow.AddHours(validHours).ToUnixTimeSeconds();

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("username", username),
                    new Claim("exp", expirationTime.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(validHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static (string Username, DateTime Expiration) ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(SECRET_KEY);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var username = jwtToken.Claims.First(x => x.Type == "username").Value;
                var expClaim = jwtToken.Claims.First(x => x.Type == "exp").Value;
                var expirationTime = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expClaim)).UtcDateTime;

                return (username, expirationTime);
            }
            catch
            {
                throw new UnauthorizedAccessException("Invalid access token.");
            }
        }
    }
}