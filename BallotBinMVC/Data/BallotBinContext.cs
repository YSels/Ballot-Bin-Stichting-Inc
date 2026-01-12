using BallotBinMVC.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace BallotBinMVC.Data
{
    public class BallotBinContext : DbContext
    {
        public BallotBinContext(DbContextOptions<BallotBinContext> options)
            : base(options)
        {
        }

        public DbSet<TableUser> Users { get; set; }
        public DbSet<TableAfvaldetectie> Afvaldetecties { get; set; }
        public DbSet<TableFollow> Follows { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // table_users
            modelBuilder.Entity<TableUser>(entity =>
            {
                entity.ToTable("table_users", "dbo");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").HasColumnType("nchar(10)");
                entity.Property(e => e.Username).HasColumnName("username").HasColumnType("text");
                entity.Property(e => e.Role).HasColumnName("role").HasColumnType("text");
            });

            // table_afvaldetectie
            modelBuilder.Entity<TableAfvaldetectie>(entity =>
            {
                entity.ToTable("table_afvaldetectie", "dbo");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").HasColumnType("nchar(10)");
                entity.Property(e => e.Tijd).HasColumnName("tijd").HasColumnType("datetime");
                entity.Property(e => e.AfvalTeller).HasColumnName("afval_teller").HasColumnType("nchar(10)");
                entity.Property(e => e.PrullenbakStatus).HasColumnName("prullenbak_status").HasColumnType("varchar(50)");
                entity.Property(e => e.UserId).HasColumnName("user_id").HasColumnType("nchar(10)");
            });

            // table_follows
            modelBuilder.Entity<TableFollow>(entity =>
            {
                entity.ToTable("table_follows", "dbo");
                entity.HasKey(e => new { e.FollowingUserId, e.FollowedUserId });
                entity.Property(e => e.FollowingUserId).HasColumnName("following_user_id").HasColumnType("nchar(10)");
                entity.Property(e => e.FollowedUserId).HasColumnName("followed_user_id").HasColumnType("nchar(10)");
            });
        }
    }
}