namespace Server.Controllers.Responses
{
    public class DeleteResponse
    {
        public DeleteResponse(string message)
        {
            this.Message = message;
        }

        public string Message { get; set; } = "";
    }
}
