using Microsoft.AspNetCore.Http;
using Server.DTOs;

namespace Services.Contracts
{
    public interface IPlaylistService
    {
        Task<PlaylistDTO> GetPlaylist(HttpRequest request);
    }
}
