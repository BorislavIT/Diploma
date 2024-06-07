using AutoMapper;
using Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Services.Contracts;

namespace Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly AppDbContext _dbContext;
        private readonly ICookieService _cookieService;
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public ShoppingCartService(AppDbContext dbContext, ICookieService cookieService, IAccountService accountService, IMapper mapper)
        {
            _dbContext = dbContext;
            _cookieService = cookieService;
            _accountService = accountService;
            _mapper = mapper;
        }

        public async Task<ShoppingCartDTO> GetShoppingCart(HttpRequest httpRequest)
        {
            var account = await _accountService.Identify(httpRequest);

            var shoppingCart = await _dbContext.ShoppingCarts
                  .Include(cart => cart.ShoppingCartMp3s)
                  .Select(cart => new ShoppingCartDTO
                  {
                      Id = cart.Id,
                      AccountId = cart.AccountId,
                      Mp3s = cart.ShoppingCartMp3s.Select(scmp3 => new Mp3DTO {
                      Name = scmp3.Mp3.Name,
                      Id = scmp3.Mp3.Id,
                      Price = scmp3.Mp3.Price,
                      Mp3Type = scmp3.Mp3.Mp3Type,
                      Author = scmp3.Mp3.Author,
                      AccountId = cart.AccountId,
                      }).ToList()
                  })
                 .FirstOrDefaultAsync();

            if (shoppingCart == null)
            {
                var newShoppingCart = new ShoppingCart() { AccountId = account.Id };

                await _dbContext.ShoppingCarts.AddAsync(newShoppingCart);
                await _dbContext.SaveChangesAsync();

                return _mapper.Map<ShoppingCartDTO>(newShoppingCart);
            }

            return shoppingCart;
        }

        public async Task<ShoppingCartDTO> AddMp3ToShoppingCart(HttpRequest httpRequest, Mp3DTO mp3)
        {
            var shoppingCart = await GetShoppingCart(httpRequest);

            var shopMp3 = new ShoppingCartMp3()
            {
                ShoppingCartId = shoppingCart.Id,
                Mp3Id = mp3.Id
            };

            var existingMp3 = await _dbContext.ShoppingCartMp3s.FirstOrDefaultAsync(m => m.Mp3Id == mp3.Id);

            if(existingMp3 != null)
            {
                return shoppingCart;
            }

            await _dbContext.ShoppingCartMp3s.AddAsync(shopMp3);
            await _dbContext.SaveChangesAsync();

            return shoppingCart;
        }

        public async Task<ShoppingCartDTO> RemoveMp3FromShoppingCart(HttpRequest httpRequest, Mp3DTO mp3)
        {
            var shoppingCart = await GetShoppingCart(httpRequest);

            var mp3ToRemove = await _dbContext.ShoppingCartMp3s.FirstOrDefaultAsync(m => m.Mp3Id == mp3.Id);

            if(mp3ToRemove != null)
            {
                 _dbContext.ShoppingCartMp3s.Remove(mp3ToRemove);
                await _dbContext.SaveChangesAsync();
            }

            return shoppingCart;
        }
    }
}
