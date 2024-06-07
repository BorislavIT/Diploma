using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Playlist
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AccountId { get; set; }
        public Account Account { get; set; }

        public ICollection<PlaylistMp3> PlaylistMp3s { get; set; } = new List<PlaylistMp3>();
    }
}
