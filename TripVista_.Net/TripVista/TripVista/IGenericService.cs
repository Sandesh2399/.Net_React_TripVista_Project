using System.Linq.Expressions;

namespace TripVista
{
    public interface IGenericService<T> where T : class
    {
        Task<int> SaveAsync();
        Task<T> AddAsync(T entity);
        Task<T> AddWithSaveAsync(T entity);
        Task<T> UpdateWithSaveAsync(T entity);
        Task DeleteAsync(T entity);
        Task DeleteWithSaveAsync(T entity);
        Task DeleteRangeAsync(IEnumerable<T> entities);
        Task DeleteRangeWithSaveAsync(IEnumerable<T> entities);
        Task<T?> GetByIdAsync<DType>(DType id);
        IQueryable<T> List(params Expression<Func<T, object>>[] includes);

        Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null!);
        IEnumerable<T> ListAsEnumerable();
        IQueryable<SpResultModel> CallStoredProcedure<SpResultModel>(string procedureName, object values = null!);
    }
}
