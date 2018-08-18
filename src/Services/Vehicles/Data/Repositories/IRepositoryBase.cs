using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Vehicles.Api.Data.Repositories
{
    public interface IRepositoryBase<T> where T : class
    {
        Task CommitAsync();
        void Remove(T entity);
        Task InsertAsync(T entity);
        void Update(T entity);
        Task<T> GetById(object id );
        IQueryable<T> Where(Expression<Func<T, bool>> clause);
        IQueryable<T> GetAll();
    }
}