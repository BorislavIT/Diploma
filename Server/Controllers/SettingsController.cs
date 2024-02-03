using Microsoft.AspNetCore.Mvc;
using Services;
using Services.DTOs;
namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            this.settingsService = settingsService;
        }

        [HttpGet(Name = "Settings")]
        public async Task<IActionResult> Get()
        {
            var settings = await this.settingsService.GetSettings();

            return Ok(settings);
        }


        [HttpPut(Name = "Settings")]
        public async Task<IActionResult> Put(SettingsDTO settingsDTO)
        {
            var settings = await this.settingsService.SaveSettings(settingsDTO);

            return Ok(settings);
        }
    }
}
