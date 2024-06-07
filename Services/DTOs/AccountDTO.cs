using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class AccountDTO
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string Username { get; set; }
    }
}
