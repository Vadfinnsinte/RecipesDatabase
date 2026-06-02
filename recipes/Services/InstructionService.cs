using recipes.DTO.Instructions;
using recipes.Interfaces;
using recipes.Models;

namespace recipes.Services
{
    public class InstructionService : IInstructionService
    {
        private readonly IInstructionRepository _instructionRepository;

        public InstructionService(IInstructionRepository instructionRepository)
        {
            _instructionRepository = instructionRepository;
        }

        public async Task<IEnumerable<InstructionResponseDto>> GetAllAsync()
        {
            var instructions = await _instructionRepository.GetAllAsync();

            return instructions.Select(i => new InstructionResponseDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                RecipeId = i.RecipeId
            });
        }

        public async Task<InstructionResponseDto?> GetByIdAsync(int id)
        {
            var i = await _instructionRepository.GetByIdAsync(id);

            if (i == null) return null;

            return new InstructionResponseDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                RecipeId = i.RecipeId
            };
        }

        public async Task<IEnumerable<InstructionResponseDto>> GetByRecipeIdAsync(int recipeId)
        {
            var instructions = await _instructionRepository.GetByRecipeIdAsync(recipeId);

            return instructions.Select(i => new InstructionResponseDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                RecipeId = i.RecipeId
            });
        }

        public async Task CreateAsync(CreateInstructionDto dto)
        {
            var instruction = new Instruction
            {
                StepNumber = dto.StepNumber,
                Description = dto.Description,
                RecipeId = dto.RecipeId
            };

            await _instructionRepository.AddAsync(instruction);
        }

        public async Task UpdateAsync(int id, UpdateInstructionDto dto)
        {
            var instruction = await _instructionRepository.GetByIdAsync(id);

            if (instruction == null)
                return;

            instruction.StepNumber = dto.StepNumber;
            instruction.Description = dto.Description;

            await _instructionRepository.UpdateAsync(instruction);
        }

        public async Task DeleteAsync(int id)
        {
            await _instructionRepository.DeleteAsync(id);
        }
    }
}