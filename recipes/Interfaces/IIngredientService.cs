using recipes.DTO.Ingredients;

namespace recipes.Interfaces
{
    public interface IIngredientService
    {
        Task<List<IngredientResponseDto>> GetAllAsync();
        Task<IngredientResponseDto?> GetByIdAsync(int id);
        Task<List<IngredientResponseDto>> GetByRecipeIdAsync(int recipeId);

        Task CreateAsync(CreateIngredientDto dto);
        Task UpdateAsync(int id, UpdateIngredientDto dto);
        Task DeleteAsync(int id);
    }
}