using recipes.Common;
using recipes.DTO;
using recipes.DTO.Ingredients;

namespace recipes.Interfaces
{
    public interface IIngredientService
    {
        Task<OperationResult<List<IngredientResponseDto>>> GetAllAsync();
        Task<OperationResult<IngredientResponseDto>> GetByIdAsync(int id);
        Task<OperationResult<List<IngredientResponseDto>>> GetByRecipeIdAsync(int recipeId);

        Task<OperationResult<CreateResponseDto>> CreateAsync(CreateIngredientDto dto);
        Task<OperationResult<bool>> UpdateAsync(int id, UpdateIngredientDto dto);
        Task<OperationResult<bool>> DeleteAsync(int id);
    }
}