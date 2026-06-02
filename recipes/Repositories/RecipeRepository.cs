
using recipes.Interfaces;
using recipes.Models;
using Microsoft.EntityFrameworkCore;

namespace recipes.Repositories
{
    public class RecipeRepository : GenericRepository<Recipe>, IRecipeRepository
    {
        private readonly AppDbContext _context;

        public RecipeRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Recipe?> GetWithDetailsAsync(int id)
        {
            return await _context.Recipes
                .Include(r => r.Ingredients)
                .Include(r => r.Instructions)
                .FirstOrDefaultAsync(r => r.Id == id);
        }
    }
}