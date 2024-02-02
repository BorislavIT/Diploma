using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Investment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(40)]
        public string Name { get; set; } = "";

        [Required]
        public InvestmentStatus Status { get; set; }

        [Required]
        public DateTime? DateOfCreation { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Value { get; set; }
    }
}
