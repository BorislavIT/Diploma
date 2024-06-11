using AutoMapper;
using Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Services.Contracts;

namespace Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly string _mp3Path = Path.Combine(Directory.GetCurrentDirectory(), "Mp3Files");
        private readonly string _thumbnailPath = Path.Combine(Directory.GetCurrentDirectory(), "Thumbnails");

        private readonly IAccountService _accountService;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public PlaylistService(AppDbContext dbContext, IAccountService accountService, IMapper mapper)
        {
            _dbContext = dbContext;
            _accountService = accountService;
            _mapper = mapper;
        }

        public async Task<PlaylistDTO> GetPlaylist(HttpRequest request)
        {
            var files = await Task.Run(() => Directory.GetFiles(_mp3Path, "*.mp3")
               .Select(fileName => new
               {
                   Name = Path.GetFileName(fileName),
                   Thumbnail = GetThumbnailFileName(Path.GetFileNameWithoutExtension(fileName))
               })
               .ToDictionary(file => file.Name, file => file.Thumbnail));

            var account = await _accountService.Identify(request);

            var playlist = await _dbContext.Playlists
                .Include(cart => cart.PlaylistMp3s) 
                .Select(cart => new PlaylistDTO
                {
                    Id = cart.Id,
                    AccountId = cart.AccountId,
                    Mp3s = cart.PlaylistMp3s.Select(pmp3 => new Mp3DTO
                    {
                        Name = pmp3.Mp3.Name,
                        Id = pmp3.Mp3.Id,
                        Price = pmp3.Mp3.Price,
                        Mp3Type = pmp3.Mp3.Mp3Type,
                        Author = pmp3.Mp3.Author,
                        AccountId = cart.AccountId,
                        ImageUrl = files.ContainsKey(pmp3.Mp3.Name + ".mp3") ? files[pmp3.Mp3.Name + ".mp3"] : ""
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (playlist == null)
            {
                var newPlaylist = new Playlist() { AccountId = account.Id };

                await _dbContext.Playlists.AddAsync(newPlaylist);
                await _dbContext.SaveChangesAsync();

                return _mapper.Map<PlaylistDTO>(newPlaylist);
            }

            return playlist;
        }

        public async Task<PlaylistDTO> AddMp3ToPlaylist(HttpRequest httpRequest, Mp3DTO mp3)
        {
            var playlist = await GetPlaylist(httpRequest);

            var pmp3 = new PlaylistMp3()
            {
                PlaylistId = playlist.Id,
                Mp3Id = mp3.Id
            };

            var existingMp3 = await _dbContext.PlaylistMp3s.FirstOrDefaultAsync(m => m.Mp3Id == mp3.Id);

            if (existingMp3 != null)
            {
                return playlist;
            }

            await _dbContext.PlaylistMp3s.AddAsync(pmp3);
            await _dbContext.SaveChangesAsync();

            return playlist;
        }

        public async Task<PlaylistDTO> RemoveMp3FromPlaylist(HttpRequest httpRequest, Mp3DTO mp3)
        {
            var playlist = await GetPlaylist(httpRequest);

            var mp3ToRemove = await _dbContext.PlaylistMp3s.FirstOrDefaultAsync(m => m.Mp3Id == mp3.Id);

            if (mp3ToRemove != null)
            {
                _dbContext.PlaylistMp3s.Remove(mp3ToRemove);
                await _dbContext.SaveChangesAsync();
            }

            return playlist;
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
