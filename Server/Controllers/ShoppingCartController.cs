using Data;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Services.Contracts;
using Services.Requests;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ICookieService _cookieService;
        private readonly IShoppingCartService _shoppingCartService;

        public ShoppingCartController(AppDbContext dbContext, ICookieService cookieService, IShoppingCartService shoppingCartService)
        {
            _dbContext = dbContext;
            _cookieService = cookieService;
            this._shoppingCartService = shoppingCartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetShoppingCart([FromQuery]GetAllMp3FilesRequest request)
        {
            var shoppingCart = await _shoppingCartService.GetShoppingCart(Request);
            
            return Ok(shoppingCart);
        }

        [HttpPost]
        public async Task<IActionResult> AddMp3ToShoppingCart(Mp3DTO mp3)
        {
            var shoppingCart = await _shoppingCartService.AddMp3ToShoppingCart(Request, mp3);

            return Ok(shoppingCart);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveMp3FromShoppingCart(Mp3DTO mp3)
        {
            var shoppingCart = await _shoppingCartService.RemoveMp3FromShoppingCart(Request, mp3);

            return Ok(shoppingCart);
        }
    }
}
