namespace TripVista
{
    public interface IDestinationService
    {
        Task<DestinationAddResponse> AddDestination(DestinationAddRequest destinationAddRequest);
        Task<List<DestinationViewModel>> GetDestinations();
        Task<DestinationAddResponse> UpdateDestination(DestinationAddRequest destinationAddRequest);
        Task<DestinationAddResponse> DeleteDestination(int Id);
    }
}
