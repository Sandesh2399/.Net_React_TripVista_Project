using Newtonsoft.Json;

namespace TripVista
{
    public class ValidationError
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string? Field { get; }
        public string Message { get; }
        public string StackTrace { get; set; }
        public ValidationError(string field, string message, string stackTrace)
        {
            Field = field != string.Empty ? field : null;
            Message = message;
            StackTrace = stackTrace;
        }
    }
}
