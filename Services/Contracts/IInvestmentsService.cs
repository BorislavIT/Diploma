using Models;
using Server.DTOs;

namespace Services
{
    public interface IInvestmentsService
    {
        Task<List<InvestmentDTO>> GetInvestments();
        Task<InvestmentDTO> CreateInvestment(InvestmentDTO investment);
    }
}
