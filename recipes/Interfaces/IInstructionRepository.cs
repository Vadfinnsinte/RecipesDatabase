using recipes.Models;

namespace recipes.Interfaces
{
    public interface IInstructionRepository : IGenericRepository<Instruction>
    {
        Task<IEnumerable<Instruction>> GetByRecipeIdAsync(int recipeId);
    }
}
