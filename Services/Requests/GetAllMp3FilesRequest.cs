using Data.Models.Enums;

namespace Services.Requests
{
    public class GetAllMp3FilesRequest
    {
        public Mp3Type? Mp3Type { get; set; }
        public string? Search { get; set; }
    }
}
