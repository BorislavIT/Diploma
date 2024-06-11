using Microsoft.AspNetCore.Http;
using Server.DTOs;

namespace Services.Contracts
{
    public interface IPlaylistService
    {
        Task<PlaylistDTO> GetPlaylist(HttpRequest request);
        Task<PlaylistDTO> AddMp3ToPlaylist(HttpRequest httpRequest, Mp3DTO mp3);
        Task<PlaylistDTO> RemoveMp3FromPlaylist(HttpRequest httpRequest, Mp3DTO mp3);
    }
}
