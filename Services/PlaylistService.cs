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
