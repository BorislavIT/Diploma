using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Mp3> Mp3s { get; set; }
        public virtual DbSet<Playlist> Playlists { get; set; }
        public virtual DbSet<PlaylistMp3> PlaylistMp3s { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Account>()
                .HasIndex(u => u.Username)
                .IsUnique();

            builder.Entity<PlaylistMp3>()
                .HasKey(pm => new { pm.PlaylistId, pm.Mp3Id });

            builder.Entity<PlaylistMp3>()
                .HasOne(pm => pm.Playlist)
                .WithMany(p => p.PlaylistMp3s)
                .HasForeignKey(pm => pm.PlaylistId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<PlaylistMp3>()
                .HasOne(pm => pm.Mp3)
                .WithMany(m => m.PlaylistMp3s)
                .HasForeignKey(pm => pm.Mp3Id)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Playlist>()
                .HasOne(p => p.Account)
                .WithMany(a => a.Playlists)
                .HasForeignKey(p => p.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Mp3>()
                .HasOne(m => m.Account)
                .WithMany(a => a.Mp3s)
                .HasForeignKey(m => m.AccountId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
