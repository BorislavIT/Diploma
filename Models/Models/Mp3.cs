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
    }
}
