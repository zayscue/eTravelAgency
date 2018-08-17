using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Vehicles.Catalog.Data.Repositories
{
    public abstract class RepositoryBase<T> : IDisposable, IRepositoryBase<T> where T : class
    {
        protected DbContext Context;
        protected DbSet<T> DbSet;

        private bool _disposedValue;

        public RepositoryBase(DbContext context)
        {
            Context = context;
            DbSet = context.Set<T>();
        }

        public virtual async Task CommitAsync()
        {
            await Context.SaveChangesAsync();
        }

        public virtual async Task<T> GetById(object id)
        {
            return await DbSet.FindAsync(id);
        }

        public virtual async Task InsertAsync(T entity)
        {
            await DbSet.AddAsync(entity);
        }

        public virtual void Remove(T entity)
        {
            DbSet.Remove(entity);
        }

        public virtual void Update(T entity)
        {
            DbSet.Update(entity);
        }

        public virtual IQueryable<T> GetAll()
        {
            return DbSet;
        }

        public virtual IQueryable<T> Where(Expression<Func<T, bool>> clause)
        {
            return clause != null
                ? DbSet.Where(clause)
                : DbSet;
        }

        #region IDisposable Support
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    if (Context != null)
                    {
                        Context.Dispose();
                        Context = null;
                    }
                    _disposedValue = true;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}