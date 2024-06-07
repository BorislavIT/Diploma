using Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class ShoppingCartDTO
    {
        public int Id { get; set; }

        public int AccountId { get; set; }
        public Account Account { get; set; }

        public ICollection<Mp3DTO> Mp3s { get; set; } = new List<Mp3DTO>();
    }
}
