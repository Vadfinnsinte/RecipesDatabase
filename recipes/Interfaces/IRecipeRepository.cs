using recipes.Models;

namespace recipes.Interfaces
{
    public interface IRecipeRepository : IGenericRepository<Recipe>
    {
        Task<Recipe?> GetWithDetailsAsync(int id);
    }
}
