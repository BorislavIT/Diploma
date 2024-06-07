using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class PlaylistMp3
    {
        public int PlaylistId { get; set; }
        public Playlist Playlist { get; set; }

        public int Mp3Id { get; set; }
        public Mp3 Mp3 { get; set; }
    }
}