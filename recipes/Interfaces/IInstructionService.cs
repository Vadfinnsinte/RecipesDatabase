using recipes.Common;
using recipes.DTO.Instructions;
using recipes.Models;

namespace recipes.Interfaces
{
    public interface IInstructionService
    {
        Task<OperationResult<List<InstructionResponseDto>>> GetAllAsync();
        Task<OperationResult<InstructionResponseDto>> GetByIdAsync(int id);
        Task<OperationResult<List<InstructionResponseDto>>> GetByRecipeIdAsync(int recipeId);

        Task<OperationResult<bool>> CreateAsync(CreateInstructionDto dto);
        Task<OperationResult<bool>> UpdateAsync(int id, UpdateInstructionDto dto);
        Task<OperationResult<bool>> DeleteAsync(int id);
    }
}