using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Investment> Investments { get; set; }
    }
}
