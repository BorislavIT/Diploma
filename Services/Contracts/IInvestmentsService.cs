using Data;
using Services.DTOs;

namespace Services
{
    public interface IInvestmentsService
    {
        Task<List<InvestmentDTO>> GetInvestments();
        Task<bool> CloseInvestment(int id);
        Task<InvestmentDTO> CreateInvestment(InvestmentDTO investment);
        Task<InvestmentSummaryDTO> GetInvestmentsSummary();
    }
}
