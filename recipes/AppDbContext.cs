using recipes.Models;
using Microsoft.EntityFrameworkCore;

namespace recipes
{
    public class AppDbContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Instruction> Instructions { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ingredient>()
                .Property(i => i.Amount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Ingredient>()
                .HasOne(i => i.Recipe)
                .WithMany(r => r.Ingredients)
                .HasForeignKey(i => i.RecipeId);

            modelBuilder.Entity<Instruction>()
                .HasOne(i => i.Recipe)
                .WithMany(r => r.Instructions)
                .HasForeignKey(i => i.RecipeId);
            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Ingredients)
                .WithOne(i => i.Recipe)
                .HasForeignKey(i => i.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Instructions)
                .WithOne(i => i.Recipe)
                .HasForeignKey(i => i.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
