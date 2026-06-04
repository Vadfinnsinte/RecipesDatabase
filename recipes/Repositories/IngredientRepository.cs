using Microsoft.EntityFrameworkCore;
using recipes.Interfaces;
using recipes.Models;

namespace recipes.Repositories
{
    public class IngredientRepository : GenericRepository<Ingredient>, IIngredientRepository
    {
        private readonly AppDbContext _context;

        public IngredientRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ingredient>> GetByRecipeIdAsync(int recipeId)
        {
            return await _context.Ingredients
                .Where(i => i.RecipeId == recipeId)
                .ToListAsync();
        }
    }
}