using recipes.Common;
using recipes.DTO.Recipes;

namespace recipes.Interfaces
{
    public interface IRecipeService
    {
        Task<OperationResult<List<RecipeResponseDto>>> GetAllAsync();
        Task<OperationResult<RecipeResponseDto>> GetByIdAsync(int id);
        Task<OperationResult<bool>> CreateAsync(CreateRecipeDto dto);
        Task<OperationResult<RecipeDetailDto>> GetFullRecipeByIdAsync(int id);
        Task<OperationResult<bool>> UpdateAsync(int id, CreateRecipeDto dto);
        Task<OperationResult<bool>> DeleteAsync(int id);
    }
}
