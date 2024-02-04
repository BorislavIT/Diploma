using Services.DTOs;
using Services;
using System.Text.Json;

public class SettingsService : ISettingsService
{
    private readonly IFileService fileService;
    private readonly string settingsFilePath = "user-settings.json";

    public SettingsService(IFileService fileService)
    {
        this.fileService = fileService;
    }

    public async Task<SettingsDTO> GetSettings()
    {
        if (!fileService.Exists(settingsFilePath))
        {
            return new SettingsDTO();
        }

        var json = await fileService.ReadAllTextAsync(settingsFilePath);

        return JsonSerializer.Deserialize<SettingsDTO>(json)!;
    }

    public async Task<SettingsDTO> SaveSettings(SettingsDTO settings)
    {
        var json = JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true });
        await fileService.WriteAllTextAsync(settingsFilePath, json);

        return settings;
    }
}