using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public virtual DbSet<Investment> Investments { get; set; }
    }
}
