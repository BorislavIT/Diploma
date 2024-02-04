using Xunit;
using Microsoft.EntityFrameworkCore;
using Data;
using Data.Models;
using AutoMapper;
using Services.DTOs;
using System.Text.Json;

namespace Services.Tests
{
    public class InvestmentsServiceTests
    {
        [Fact]
        public async Task GetInvestments_CorrectlyReturnsInvestments()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            var investmentsSeeds = new List<Investment>() {
                new Investment { Name = "1", Type = "Type1", Value = 10, DateOfCreation = DateTime.Now, Id=1 },
                new Investment { Name = "2", Type = "Type1", Value = 20, DateOfCreation = DateTime.Now, Id=2  },
                new Investment { Name = "3", Type = "Type2", Value = 30, DateOfCreation = DateTime.Now, Id=3  }
            };

            using (var context = new AppDbContext(options))
            {
                context.Investments.AddRange(investmentsSeeds);
                context.SaveChanges();
            }

            List<InvestmentDTO> result;
            using (var context = new AppDbContext(options))
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Investment, InvestmentDTO>();
                    cfg.CreateMap<InvestmentDTO, Investment>();
                });
                var mapper = config.CreateMapper();

                var service = new InvestmentsService(context, mapper);
                result = await service.GetInvestments();
            }

            var expectedJson = JsonSerializer.Serialize(investmentsSeeds);
            var actualJson = JsonSerializer.Serialize(result);

            Assert.Equal(expectedJson, actualJson);
        }

        [Fact]
        public async Task CreateInvestment_CreatesNewInvestment()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase4")
                .Options;

            var investmentDTO = new InvestmentDTO { Name = "1", Type = "Type1", Value = 10, DateOfCreation = DateTime.Now, Id = 1 };

            InvestmentDTO result;
            using (var context = new AppDbContext(options))
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Investment, InvestmentDTO>();
                    cfg.CreateMap<InvestmentDTO, Investment>();
                });
                var mapper = config.CreateMapper();

                var service = new InvestmentsService(context, mapper);
                result = await service.CreateInvestment(investmentDTO);
            }

            using (var context = new AppDbContext(options))
            {
                Assert.Single(context.Investments);
                Assert.Equal(investmentDTO.Type, context.Investments.First().Type);
                Assert.Equal(investmentDTO.Value, context.Investments.First().Value);
            }
        }

        [Fact]
        public async Task CloseInvestment_ClosesExistingInvestment()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase5")
                .Options;

            var investment = new Investment { Name = "1", Type = "Type1", Value = 10, DateOfCreation = DateTime.Now, Id = 0 };

            using (var context = new AppDbContext(options))
            {
                context.Investments.Add(investment);
                context.SaveChanges();
            }

            bool doesntExistOrClosed;
            using (var context = new AppDbContext(options))
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Investment, InvestmentDTO>();
                    cfg.CreateMap<InvestmentDTO, Investment>();
                });
                var mapper = config.CreateMapper();

                var service = new InvestmentsService(context, mapper);
                doesntExistOrClosed = await service.CloseInvestment(investment.Id);
            }

            using (var context = new AppDbContext(options))
            {
                Assert.False(doesntExistOrClosed);
                Assert.Equal(InvestmentStatus.CLOSED, context.Investments.First().Status);
            }
        }

        [Fact]
        public async Task GetInvestmentsSummary_ReturnsCorrectSummary()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase6")
                .Options;

            var investments = new List<Investment>
            {
               new Investment { Name = "1", Type = "Type1", Value = 10, DateOfCreation = DateTime.Now, Id=1, Status=InvestmentStatus.CLOSED},
               new Investment { Name = "2", Type = "Type2", Value = 5, DateOfCreation = DateTime.Now, Id=2, Status=InvestmentStatus.ACTIVE },
               new Investment { Name = "3", Type = "Type3", Value = 4, DateOfCreation = DateTime.Now, Id=3, Status=InvestmentStatus.ACTIVE }
            };

            using (var context = new AppDbContext(options))
            {
                context.Investments.AddRange(investments);
                context.SaveChanges();
            }

            InvestmentSummaryDTO result;
            using (var context = new AppDbContext(options))
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Investment, InvestmentDTO>();
                    cfg.CreateMap<InvestmentDTO, Investment>();
                });
                var mapper = config.CreateMapper();

                var service = new InvestmentsService(context, mapper);
                result = await service.GetInvestmentsSummary();
            }

            Assert.Equal(investments.Where(i => i.Status == InvestmentStatus.ACTIVE).Count(), result.ActiveInvestments);
            Assert.Equal(investments.Where(i => i.Status == InvestmentStatus.CLOSED).Count(), result.ClosedInvestments);
            Assert.Equal(investments.Sum(i => i.Value), result.Total);
            Assert.Equal(investments.GroupBy(i => i.Type).Count(), result.DistributedValues.Count);
        }
    }
}