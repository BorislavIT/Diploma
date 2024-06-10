using Data;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ICookieService _cookieService;
        private readonly IPlaylistService _playlistService;

        public PlaylistController(AppDbContext dbContext, ICookieService cookieService, IPlaylistService playlistService)
        {
            _dbContext = dbContext;
            _cookieService = cookieService;
            _playlistService = playlistService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlaylist()
        {
            var shoppingCart = await _playlistService.GetPlaylist(Request);
            
            return Ok(shoppingCart);
        }
    }
}
