using recipes.DTO.Instructions;
using recipes.Models;

namespace recipes.Interfaces
{
    public interface IInstructionService
    {
        Task<IEnumerable<InstructionResponseDto>> GetAllAsync();
        Task<InstructionResponseDto?> GetByIdAsync(int id);
        Task<IEnumerable<InstructionResponseDto>> GetByRecipeIdAsync(int recipeId);

        Task CreateAsync(CreateInstructionDto dto);
        Task UpdateAsync(int id, UpdateInstructionDto dto);
        Task DeleteAsync(int id);
    }
}