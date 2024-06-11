using Data.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string Username { get; set; } = "";

        [Required]
        public string Password { get; set; } = "";

        public string Token { get; set; } = "";

        public Role Role { get; set; }

        public ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
        public ICollection<Mp3> Mp3s { get; set; } = new List<Mp3>();
    }
}
