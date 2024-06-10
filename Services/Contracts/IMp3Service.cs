using Microsoft.AspNetCore.Http;
using Server.Controllers.Requests;
using Server.DTOs;
using Services.Requests;

namespace Services.Contracts
{
    public interface IMp3Service
    {
        Task<List<Mp3DTO>> GetAllMp3Files (GetAllMp3FilesRequest request);

        Task<string> SaveMp3File(HttpRequest httpRequest, Mp3Request request);
    }
}
