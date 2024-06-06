using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Mp3Controller : ControllerBase
    {
        private readonly string _mp3Path = Path.Combine(Directory.GetCurrentDirectory(), "Mp3Files");
        private readonly string _thumbnailPath = Path.Combine(Directory.GetCurrentDirectory(), "Thumbnails");


        public Mp3Controller()
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMp3Files()
        {
            var files = await Task.Run(() => Directory.GetFiles(_mp3Path, "*.mp3")
                                                      .Select(fileName => new
                                                      {
                                                          Name = Path.GetFileName(fileName),
                                                          Thumbnail = GetThumbnailFileName(Path.GetFileNameWithoutExtension(fileName))
                                                      })
                                                      .ToArray());
            return Ok(files);
        }

        private string GetThumbnailFileName(string baseFileName)
        {
            var extensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            foreach (var ext in extensions)
            {
                var filePath = Path.Combine(_thumbnailPath, baseFileName + ext);
                if (System.IO.File.Exists(filePath))
                {
                    return baseFileName + ext;
                }
            }
            return null;
        }
    }
}
