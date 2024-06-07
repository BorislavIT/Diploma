using Data.Models.Enums;

namespace Server.Controllers.Requests
{
    public class GetAllMp3FilesRequest
    {
        public Mp3Type? Mp3Type { get; set; }
        public string? Search { get; set; }
    }
}
