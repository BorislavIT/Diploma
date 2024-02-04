using Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Services.DTOs
{
    public class InvestmentDTO
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string Name { get; set; } = "";

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string Type { get; set; } = "";

        [Required]
        public InvestmentStatus Status { get; set; }

        [Required]
        public DateTime? DateOfCreation { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Value { get; set; }
    }
}
