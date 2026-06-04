using recipes.Models;

namespace recipes.Interfaces
{
    public interface IIngredientRepository : IGenericRepository<Ingredient>
    {
        Task<IEnumerable<Ingredient>> GetByRecipeIdAsync(int recipeId);
    }
}