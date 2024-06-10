namespace Server.DTOs
{
    public class PlaylistDTO
    {
        public int Id { get; set; }

        public int AccountId { get; set; }

        public ICollection<Mp3DTO> Mp3s { get; set; } = new List<Mp3DTO>();
    }
}
