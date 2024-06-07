using Data.Models.Enums;

namespace Server.Controllers.Requests
{
    public class Mp3FileRequest
    {
        public IFormFile Mp3File { get; set; }
        public IFormFile Thumbnail { get; set; }
    }
}
