using Data;
using Data.Models;
using Data.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Server.Controllers.Requests;
using Server.DTOs;
using Services.Contracts;
using Services.Requests;

namespace Services
{
    public class Mp3Service : IMp3Service
    {
        private readonly string _mp3Path = Path.Combine(Directory.GetCurrentDirectory(), "Mp3Files");
        private readonly string _thumbnailPath = Path.Combine(Directory.GetCurrentDirectory(), "Thumbnails");

        private readonly ICookieService _cookieService;
        private readonly AppDbContext _dbContext;

        public Mp3Service(AppDbContext dbContext, ICookieService cookieService)
        {
            _dbContext = dbContext;
            _cookieService = cookieService;
        }

        public async Task<List<Mp3DTO>> GetAllMp3Files(GetAllMp3FilesRequest request)
        {
            var files = await Task.Run(() => Directory.GetFiles(_mp3Path, "*.mp3")
                              .Select(fileName => new
                              {
                                  Name = Path.GetFileName(fileName),
                                  Thumbnail = GetThumbnailFileName(Path.GetFileNameWithoutExtension(fileName))
                              })
            .ToArray());

            var dbMp3s = await _dbContext.Mp3s.ToListAsync();

            var mp3s = dbMp3s
               .Where(mp3 => (mp3.Mp3Type == request.Mp3Type || request.Mp3Type == null) &&
                      (string.IsNullOrEmpty(request.Search) ||
                       mp3.Name.Contains(request.Search, StringComparison.OrdinalIgnoreCase) ||
                       mp3.Author.Contains(request.Search, StringComparison.OrdinalIgnoreCase)))
                .Select((mp3) => {
                    var file = files.FirstOrDefault(f => f.Name == mp3.Name + ".mp3");
                    return new Mp3DTO
                    {
                        Id = mp3.Id,
                        Name = mp3.Name,
                        Price = mp3.Price,
                        Mp3Type = mp3.Mp3Type,
                        Author = mp3.Author,
                        AccountId = mp3.AccountId,
                        ImageUrl = file?.Thumbnail ?? ""
                    };
                });

            return mp3s.ToList();
        }

        public async Task<string> SaveMp3File(HttpRequest httpRequest, Mp3Request request)
        {
            var mp3File = request.Mp3File;
            var imageFile = request.Thumbnail;

            var (username, expires) = _cookieService.GetAuthTokenCookie(httpRequest);

            var account = _dbContext.Accounts.First(a => a.Username == username);

            if (account.Role != Role.ADMINISTRATOR)
                throw new UnauthorizedAccessException("Only administrators can upload MP3 files.");

            if (mp3File == null || mp3File.Length == 0)
                throw new ArgumentException("No MP3 file uploaded.");

            if (Path.GetExtension(mp3File.FileName).ToLower() != ".mp3")
                throw new ArgumentException("Only .mp3 files are allowed for MP3 file.");

            if (imageFile == null || imageFile.Length == 0)
                throw new ArgumentException("No image file uploaded.");

            var allowedImageExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            string imageFileExtension = Path.GetExtension(imageFile.FileName).ToLower();

            if (!allowedImageExtensions.Contains(imageFileExtension))
            {
                throw new ArgumentException("Only .jpg, .jpeg, .png, and .gif files are allowed for image file.");
            }

            var mp3FilePath = Path.Combine(_mp3Path, request.Name + ".mp3");
            var imageFilePath = Path.Combine(_thumbnailPath, request.Name + imageFileExtension);

            try
            {
                if (!Directory.Exists(_mp3Path))
                {
                    Directory.CreateDirectory(_mp3Path);
                }

                if (!Directory.Exists(_thumbnailPath))
                {
                    Directory.CreateDirectory(_thumbnailPath);
                }

                using (var mp3Stream = new FileStream(mp3FilePath, FileMode.Create))
                {
                    await mp3File.CopyToAsync(mp3Stream);
                }

                // Ensure the image file has the same name as the mp3 file but with the correct image extension
                var newImageFileName = Path.GetFileNameWithoutExtension(request.Name) + imageFileExtension;
                var newImageFilePath = Path.Combine(_thumbnailPath, newImageFileName);

                using (var imageStream = new FileStream(newImageFilePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(imageStream);
                }

                var mp3 = new Mp3
                {
                    AccountId = account.Id,
                    Name = request.Name,
                    Author = request.Author,
                    Price = request.Price,
                    Mp3Type = request.Mp3Type,
                };

                await _dbContext.Mp3s.AddAsync(mp3);
                await _dbContext.SaveChangesAsync();

                return request.Name;
            }
            catch (Exception ex)
            {
                throw new ArgumentException($"Error saving mp3: {ex.Message}");
            }
        }

        private string GetThumbnailFileName(string baseFileName)
        {
            var extensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            foreach (var ext in extensions)
            {
                var filePath = Path.Combine(_thumbnailPath, baseFileName + ext);
                if (File.Exists(filePath))
                {
                    return baseFileName + ext;
                }
            }

            return null;
        }
    }
}
