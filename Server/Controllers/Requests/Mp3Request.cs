using Data.Models.Enums;

namespace Server.Controllers.Requests
{
    public class Mp3Request
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Mp3Type Mp3Type { get; set; }
        public string Author { get; set; }
        public int AccountId { get; set; }
        public IFormFile Mp3File { get; set; } = null;
        public IFormFile Thumbnail { get; set; } = null;
    }
}
