using Services.DTOs;

namespace Services
{
    public interface ISettingsService
    {
        Task<SettingsDTO> GetSettings();
        Task<SettingsDTO> SaveSettings(SettingsDTO settings);
    }
}
