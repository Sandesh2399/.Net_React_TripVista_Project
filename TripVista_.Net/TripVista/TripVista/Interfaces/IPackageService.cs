namespace TripVista
{
    public interface IPackageService
    {
        Task<PackageAddResponse> AddPackage(PackageAddRequest packageAddRequest);
        Task<List<PackageViewModel>> GetPackages(int? destinationId, int? noOfPeople, int? minPrice, int? maxPrice);
        Task<PackageAddResponse> UpdatePackage(PackageAddRequest packageAddRequest);
        Task<PackageAddResponse> DeletePackage(int Id);
    }
}
