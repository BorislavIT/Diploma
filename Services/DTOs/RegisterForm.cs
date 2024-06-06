using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class RegisterForm
    {
        [Required]
        [MinLength(3), MaxLength(40)]
        public string Username { get; set; }

        [Required]
        [MinLength(3), MaxLength(40)]
        public string Password { get; set; }

        [Required]
        [MinLength(3), MaxLength(40)]
        public string ConfirmPassword { get; set; }
    }
}
