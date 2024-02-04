using System.ComponentModel.DataAnnotations;

namespace Services.DTOs
{
    public class SettingsDTO
    {
        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string FirstName { get; set; } = "";

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string LastName { get; set; } = "";

        [Required]
        [Range(18, 100)]
        public int Age { get; set; }
    }
}
