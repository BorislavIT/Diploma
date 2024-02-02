using Models;

namespace Server.DTOs
{
    public class InvestmentDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public InvestmentStatus Status { get; set; }

        public DateTime? DateOfCreation { get; set; }

        public double Value { get; set; }
    }
}
