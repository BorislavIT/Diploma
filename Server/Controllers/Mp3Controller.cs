using Microsoft.AspNetCore.Mvc;
using Server.Controllers.Requests;

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

        [HttpPost()]
        public async Task<IActionResult> SaveFiles([FromForm] Mp3Request request)
        {
            return Ok();
            //if (mp3File == null || mp3File.Length == 0)
            //    return BadRequest("No MP3 file uploaded.");

            //if (Path.GetExtension(mp3File.FileName).ToLower() != ".mp3")
            //    return BadRequest("Only .mp3 files are allowed for MP3 file.");

            //if (imageFile == null || imageFile.Length == 0)
            //    return BadRequest("No image file uploaded.");

            //var allowedImageExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            //var imageFileExtension = Path.GetExtension(imageFile.FileName).ToLower();

            //if (!allowedImageExtensions.Contains(imageFileExtension))
            //    return BadRequest("Only .jpg, .jpeg, .png, and .gif files are allowed for image file.");

            //var mp3FilePath = Path.Combine(_mp3Path, mp3File.FileName);
            //var imageFilePath = Path.Combine(_thumbnailPath, Path.GetFileNameWithoutExtension(mp3File.FileName) + imageFileExtension);

            //try
            //{
            //    if (!Directory.Exists(_mp3Path))
            //    {
            //        Directory.CreateDirectory(_mp3Path);
            //    }

            //    if (!Directory.Exists(_thumbnailPath))
            //    {
            //        Directory.CreateDirectory(_thumbnailPath);
            //    }

            //    using (var mp3Stream = new FileStream(mp3FilePath, FileMode.Create))
            //    {
            //        await mp3File.CopyToAsync(mp3Stream);
            //    }

            //    using (var imageStream = new FileStream(imageFilePath, FileMode.Create))
            //    {
            //        await imageFile.CopyToAsync(imageStream);
            //    }

            //    return Ok(new { Mp3FileName = mp3File.FileName, ImageFileName = Path.GetFileName(imageFilePath) });
            //}
            //catch (Exception ex)
            //{
            //    return StatusCode(500, $"Internal server error: {ex.Message}");
            //}
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
