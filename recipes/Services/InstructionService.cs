using recipes.Common;
using recipes.DTO;
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

        public async Task<OperationResult<List<InstructionResponseDto>>> GetAllAsync()
        {
            var instructions = await _instructionRepository.GetAllAsync();

            var result = instructions.Select(i => new InstructionResponseDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                RecipeId = i.RecipeId
            }).ToList();

            return OperationResult<List<InstructionResponseDto>>.Success(result);
        }

        public async Task<OperationResult<InstructionResponseDto>> GetByIdAsync(int id)
        {
            var i = await _instructionRepository.GetByIdAsync(id);

            if (i == null)
                return OperationResult<InstructionResponseDto>.Failure("Instruction not found");

            return OperationResult<InstructionResponseDto>.Success(new InstructionResponseDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                RecipeId = i.RecipeId
            });
        }

        public async Task<OperationResult<List<InstructionResponseDto>>> GetByRecipeIdAsync(int recipeId)
        {
            var instructions = await _instructionRepository.GetByRecipeIdAsync(recipeId);

            var result = instructions.Select(i => new InstructionResponseDto
            {
                Id = i.Id,
                StepNumber = i.StepNumber,
                Description = i.Description,
                RecipeId = i.RecipeId
            }).ToList();

            return OperationResult<List<InstructionResponseDto>>.Success(result);
        }

        public async Task<OperationResult<CreateResponseDto>> CreateAsync(CreateInstructionDto dto)
        {
            var instruction = new Instruction
            {
                StepNumber = dto.StepNumber,
                Description = dto.Description,
                RecipeId = dto.RecipeId
            };

            await _instructionRepository.AddAsync(instruction);

            return OperationResult<CreateResponseDto>.Success(
                    new CreateResponseDto
                    {
                        Id = instruction.Id
                    }
                );
        }

        public async Task<OperationResult<bool>> UpdateAsync(int id, UpdateInstructionDto dto)
        {
            var instruction = await _instructionRepository.GetByIdAsync(id);

            if (instruction == null)
                return OperationResult<bool>.Failure("Instruction not found");

            instruction.StepNumber = dto.StepNumber;
            instruction.Description = dto.Description;

            await _instructionRepository.UpdateAsync(instruction);

            return OperationResult<bool>.Success(true);
        }

        public async Task<OperationResult<bool>> DeleteAsync(int id)
        {
            var instruction = await _instructionRepository.GetByIdAsync(id);

            if (instruction == null)
                return OperationResult<bool>.Failure("Instruction not found");

            await _instructionRepository.DeleteAsync(id);

            return OperationResult<bool>.Success(true);
        }
    }
}