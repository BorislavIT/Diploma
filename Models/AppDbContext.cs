using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Investment> Investments { get; set; }
    }
}
