using Microsoft.EntityFrameworkCore;
using recipes.Interfaces;
using recipes.Models;

namespace recipes.Repositories
{
    public class InstructionRepository : GenericRepository<Instruction>, IInstructionRepository
    {
        private readonly AppDbContext _context;

        public InstructionRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Instruction>> GetByRecipeIdAsync(int recipeId)
        {
            return await _context.Instructions
                .Where(i => i.RecipeId == recipeId)
                .OrderBy(i => i.StepNumber)
                .ToListAsync();
        }
    }
}
