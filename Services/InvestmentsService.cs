using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Data;
using Server.DTOs;
using Services.DTOs;

namespace Services
{
    public class InvestmentsService : IInvestmentsService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public InvestmentsService(AppDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<InvestmentDTO> CreateInvestment(InvestmentDTO investment)
        {
            investment.DateOfCreation = DateTime.UtcNow;
            var mappedInvestment = this.mapper.Map<Investment>(investment);
            await this.dbContext.Investments.AddAsync(mappedInvestment);
            await this.dbContext.SaveChangesAsync();

            return this.mapper.Map<InvestmentDTO>(mappedInvestment);
        }

        public async Task<bool> CloseInvestment(int id)
        {
            var investment = this.dbContext.Investments.FirstOrDefault(i => i.Id == id);
            if (investment == null || investment.Status == InvestmentStatus.CLOSED) return false;

            investment.Status = InvestmentStatus.CLOSED;
            this.dbContext.Update(investment);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<InvestmentDTO>> GetInvestments()
        {
            return await this.dbContext.Investments.Select(i => this.mapper.Map<InvestmentDTO>(i)).ToListAsync();
        }

        public async Task<InvestmentSummaryDTO> GetInvestmentsSummary()
        {
            var activeInvestments = await this.dbContext.Investments
                .CountAsync(i => i.Status == InvestmentStatus.ACTIVE);

            var closedInvestments = await this.dbContext.Investments
                .CountAsync(i => i.Status == InvestmentStatus.CLOSED);

            var totalInvested = await this.dbContext.Investments
                .SumAsync(i => i.Value);

            var groupedByThingy = await this.dbContext.Investments
                .GroupBy(i => i.Type)
                .Select(g => new DistributedValueDTO
                {
                    Type = g.Key,
                    Value = g.Sum(i => i.Value)
                })
                .ToListAsync();

            var summary = new InvestmentSummaryDTO(activeInvestments, closedInvestments, totalInvested, groupedByThingy);
            return summary;
        }
    }
}
