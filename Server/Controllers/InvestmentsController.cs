using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvestmentsController : ControllerBase
    {
        private readonly IInvestmentsService investmentsService;
        public InvestmentsController(IInvestmentsService investmentsService)
        {
            this.investmentsService = investmentsService;
        }

        [HttpGet(Name = "Investments")]
        public async Task<IActionResult> Get()
        {
            var investments = await this.investmentsService.GetInvestments();

            return Ok(investments);
        }

        [HttpPost(Name = "Investments")]
        public async Task<IActionResult> Post(InvestmentDTO investmentDTO)
        {
            var investment = await this.investmentsService.CreateInvestment(investmentDTO);
            return Ok(investment);
        }
    }
}
