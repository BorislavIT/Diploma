namespace Services.DTOs
{
    public class InvestmentSummaryDTO
    {
        public InvestmentSummaryDTO(int activeInvestments, int closedInvestments, double total, List<DistributedValueDTO> distributedValues)
        {
            this.ActiveInvestments = activeInvestments;
            this.ClosedInvestments = closedInvestments;
            this.Total = total;
            this.DistributedValues = distributedValues;
        }

        public int ActiveInvestments { get; set; }
        public int ClosedInvestments { get; set; }
        public double Total { get; set; }

        public List<DistributedValueDTO> DistributedValues { get; set; } = [];
    }
}
