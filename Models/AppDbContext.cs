using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Mp3> Mp3s { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Account>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }
    }
}
