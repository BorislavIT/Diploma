using Data.Models;
using Data.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Services.Hashers;
using Services.TokenHandlers;

namespace Data.Seeders
{
    public static class AdminSeeder
    {
        public async static void Initialize(IServiceProvider serviceProvider)
        {
            var username = "admin";
            var password = "admin";
            var token = JWTTokenHandler.GenerateToken(username, 24);

            var account = new Account
            {
                Username = username,
                Password = PasswordHasher.HashPassword(password),
                Token = token,
                Role = Role.ADMINISTRATOR
            };

            using (var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                if (context.Accounts.Any())
                {
                    return;
                }

                await context.Accounts.AddAsync(account);
                context.SaveChanges();
            }
        }
    }
}
