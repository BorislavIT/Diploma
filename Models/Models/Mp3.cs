using Data.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Mp3
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string Name { get; set; } = "";

        public decimal Price { get; set; }

        public Mp3Type Mp3Type { get; set; }

        public string Author { get; set; } = "";

        [Required]
        public int AccountId { get; set; }
        public Account Account { get; set; }

        public ICollection<PlaylistMp3> PlaylistMp3s { get; set; } = new List<PlaylistMp3>();
    }
}
