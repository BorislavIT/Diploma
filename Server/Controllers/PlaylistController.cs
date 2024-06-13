using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Services.Contracts;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistService _playlistService;

        public PlaylistController(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlaylist()
        {
            var playlist = await _playlistService.GetPlaylist(Request);
            
            return Ok(playlist);
        }

        [HttpPost]
        public async Task<IActionResult> AddMp3ToPlaylist(Mp3DTO mp3)
        {
            var playlist = await _playlistService.AddMp3ToPlaylist(Request, mp3);

            return Ok(playlist);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveMp3FromPlaylist(Mp3DTO mp3)
        {
            var playlist = await _playlistService.RemoveMp3FromPlaylist(Request, mp3);

            return Ok(playlist);
        }
    }
}
