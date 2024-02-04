namespace Services
{
    public class FileService : IFileService
    {
        public async Task<string> ReadAllTextAsync(string path)
        {
            return await File.ReadAllTextAsync(path);
        }

        public async Task WriteAllTextAsync(string path, string contents)
        {
            await File.WriteAllTextAsync(path, contents);
        }

        public bool Exists(string path)
        {
            return File.Exists(path);
        }
    }
}