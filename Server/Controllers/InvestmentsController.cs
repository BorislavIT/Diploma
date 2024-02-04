using Microsoft.AspNetCore.Mvc;
using Server.Controllers.Responses;
using Services;
using Services.DTOs;

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

        [HttpGet("summary", Name = "Get Investments Summary")]
        public async Task<IActionResult> GetSummary()
        {
            var summary = await this.investmentsService.GetInvestmentsSummary();

            return Ok(summary);
        }

        [HttpDelete("{id}", Name = "DeleteInvestment")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.investmentsService.CloseInvestment(id);
            if (!result)
            {
                return NotFound(new DeleteResponse($"Investment with ID {id} was not found or is already closed."));
            }
            return NoContent();
        }

        [HttpPost(Name = "Investments")]
        public async Task<IActionResult> Post(InvestmentDTO investmentDTO)
        {
            var investment = await this.investmentsService.CreateInvestment(investmentDTO);
            return Ok(investment);
        }
    }
}
