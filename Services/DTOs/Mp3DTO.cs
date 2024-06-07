using Data.Models.Enums;

namespace Server.DTOs
{
    public class Mp3DTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public decimal Price { get; set; }

        public Mp3Type Mp3Type { get; set; }

        public string Author { get; set; } = "";

        public int AccountId { get; set; }

        public string ImageUrl { get; set; } = "";
    }
}
