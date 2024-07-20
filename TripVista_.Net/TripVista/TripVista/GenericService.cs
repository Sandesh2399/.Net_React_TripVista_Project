using System.Data;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using TripVista.Models;
using Dapper;
namespace TripVista
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly AppDbContext _db;
        public IConfiguration _configuration { get; }
        private readonly IDbConnection _spCallConnection;

        public GenericService(AppDbContext _dbContext, IConfiguration configuration = null!)
        {
            _db = _dbContext;
            _configuration = configuration;
            _spCallConnection = new SqlConnection(_configuration.GetConnectionString("LegalSystemConnection")?.ToString());
        }

        #region Public methods
        public async Task<int> SaveAsync()
        {
            return await _db.SaveChangesAsync();
        }
        public async Task<T> AddAsync(T entity)
        {
            await Entity().AddAsync(entity);
            return entity;
        }
        public async Task<T> AddWithSaveAsync(T entity)
        {
            await AddAsync(entity);
            await SaveAsync();
            return entity;
        }
        public async Task<T> UpdateWithSaveAsync(T entity)
        {
            var attachedEntity = _db.ChangeTracker.Entries<T>().FirstOrDefault();
            if (attachedEntity != null)
            {
                _db.Entry(attachedEntity.Entity).State = EntityState.Detached;
            }

            _db.Entry(entity).State = EntityState.Modified;

            await SaveAsync();
            return entity;
        }
        public async Task DeleteAsync(T entity)
        {
            await Task.Run(() => Entity().Remove(entity));
        }
        public async Task DeleteWithSaveAsync(T entity)
        {
            await DeleteAsync(entity);
            await SaveAsync();
        }
        public async Task DeleteRangeAsync(IEnumerable<T> entities)
        {
            await Task.Run(() => Entity().RemoveRange(entities));
        }
        public async Task DeleteRangeWithSaveAsync(IEnumerable<T> entities)
        {
            await DeleteRangeAsync(entities);
            await SaveAsync();
        }
        public async Task<T?> GetByIdAsync<DType>(DType id) => await Entity().FindAsync(id);
        public async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null!) => await Query().CountAsync(predicate!);
        public IQueryable<T> List(params Expression<Func<T, object>>[] includes)
        {
            var query = _db.Set<T>().AsQueryable<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }
            return query;
        }
        public IEnumerable<T> ListAsEnumerable() => List();
        public IQueryable<SpResultModel> CallStoredProcedure<SpResultModel>(string procedureName, object values = null!)
        {
            var results = _spCallConnection.Query<SpResultModel>(procedureName, values, commandType: CommandType.StoredProcedure).AsQueryable();
            return results;
        }
        #endregion
        #region Private methods

        /// <summary>
        /// Creates a DbSet<T> and converts it to a generic IQueryable<T>
        /// </summary>
        /// <returns>An <seealso cref="IQueryable{T}"/> that represents the input sequence</returns>
        private IQueryable<T> Query() => Entity().AsQueryable<T>();

        /// <summary>
        /// Creates a DbSet<T> that can be used to query and save instances of T
        /// </summary>
        /// <returns>A <seealso cref="DbSet{TEntity}"/> for the given TEntity type</returns>
        private DbSet<T> Entity() => _db.Set<T>();

        #endregion
    }
}