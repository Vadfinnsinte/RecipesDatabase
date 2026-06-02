using recipes.DTO.Recipes;

namespace recipes.Interfaces
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipeResponseDto>> GetAllAsync();
        Task<RecipeResponseDto?> GetByIdAsync(int id);
        Task CreateAsync(CreateRecipeDto dto);
    }
}
