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

        public string token { get; set; } = "";
    }
}
