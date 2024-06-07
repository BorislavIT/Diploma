using Microsoft.AspNetCore.Http;
using Server.DTOs;

namespace Services.Contracts
{
    public interface IShoppingCartService
    {
        Task<ShoppingCartDTO> GetShoppingCart(HttpRequest httpRequest);
        Task<ShoppingCartDTO> AddMp3ToShoppingCart(HttpRequest httpRequest, Mp3DTO mp3);
        Task<ShoppingCartDTO> RemoveMp3FromShoppingCart(HttpRequest httpRequest, Mp3DTO mp3);
    }
}
