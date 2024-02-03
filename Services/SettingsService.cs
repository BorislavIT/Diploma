using Services.DTOs;
using System.Text.Json;

namespace Services
{
    public class SettingsService : ISettingsService
    {
        private readonly string SETTINGS_FILE_NAME = "user-settings.json";

        public async Task<SettingsDTO> GetSettings()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), this.SETTINGS_FILE_NAME);
            if (!File.Exists(filePath))
            {
                return new SettingsDTO();
            }

            var json = await File.ReadAllTextAsync(filePath);

            return JsonSerializer.Deserialize<SettingsDTO>(json)!;
        }

        public async Task<SettingsDTO> SaveSettings(SettingsDTO settings)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), this.SETTINGS_FILE_NAME);
            var json = JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(filePath, json);

            return settings;
        }
    }
}
