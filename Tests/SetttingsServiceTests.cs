using Moq;
using Services;
using Services.DTOs;
using System.Text.Json;
using Xunit;

public class SettingsServiceTests
{
    private readonly Mock<IFileService> fileServiceMock;
    private readonly SettingsService settingsService;

    public SettingsServiceTests()
    {
        fileServiceMock = new Mock<IFileService>();
        settingsService = new SettingsService(fileServiceMock.Object);
    }

    [Fact]
    public async Task GetSettings_FileDoesNotExist_ReturnsNewSettingsDTO()
    {
        fileServiceMock.Setup(fs => fs.Exists(It.IsAny<string>())).Returns(false);

        var settings = await settingsService.GetSettings();

        string expectedJson = JsonSerializer.Serialize(new SettingsDTO());
        string resultJson = JsonSerializer.Serialize(settings);

        Assert.Equal(expectedJson, resultJson);
    }

    [Fact]
    public async Task GetSettings_FileExists_ReturnsDeserializedSettingsDTO()
    {
        var expectedSettings = new SettingsDTO();
        var serializedSettings = JsonSerializer.Serialize(expectedSettings);
        fileServiceMock.Setup(fs => fs.Exists(It.IsAny<string>())).Returns(true);
        fileServiceMock.Setup(fs => fs.ReadAllTextAsync(It.IsAny<string>())).ReturnsAsync(serializedSettings);

        var result = await settingsService.GetSettings();

        string expectedJson = JsonSerializer.Serialize(expectedSettings);
        string resultJson = JsonSerializer.Serialize(result);

        Assert.Equal(expectedJson, resultJson);
    }

    [Fact]
    public async Task SaveSettings_WritesSerializedSettingsToFile()
    {
        var settings = new SettingsDTO();
        string writtenContent = null;
        fileServiceMock.Setup(fs => fs.WriteAllTextAsync(It.IsAny<string>(), It.IsAny<string>()))
            .Callback<string, string>((path, content) => writtenContent = content)
            .Returns(Task.CompletedTask);

        var result = await settingsService.SaveSettings(settings);

        var deserializedSettings = JsonSerializer.Deserialize<SettingsDTO>(writtenContent);

        string expectedJson = JsonSerializer.Serialize(settings);
        string resultJson = JsonSerializer.Serialize(deserializedSettings);

        Assert.Equal(expectedJson, resultJson);
    }
}