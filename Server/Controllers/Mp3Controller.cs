using Microsoft.AspNetCore.Mvc;
using Server.Controllers.Requests;
using Services.Contracts;
using Services.Requests;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Mp3Controller : ControllerBase
    {
        private readonly IMp3Service _mp3Service;

        public Mp3Controller(IMp3Service mp3Service)
        {
            _mp3Service = mp3Service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMp3Files([FromQuery] GetAllMp3FilesRequest request)
        {
            var mp3s = await _mp3Service.GetAllMp3Files(request);

            return Ok(mp3s);
        }

        [HttpPost]
        public async Task<IActionResult> SaveMp3File([FromForm] Mp3Request request)
        {
            var mp3 = await _mp3Service.SaveMp3File(Request, request);

            return Ok(mp3);
        }
    }
}
