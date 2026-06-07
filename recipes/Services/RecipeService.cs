using recipes.Common;
using recipes.DTO;
using recipes.DTO.Ingredients;
using recipes.DTO.Instructions;
using recipes.DTO.Recipes;
using recipes.Interfaces;
using recipes.Models;

namespace recipes.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IInstructionRepository _instructionRepository;

        public RecipeService(
            IRecipeRepository recipeRepository,
            IIngredientRepository ingredientRepository,
            IInstructionRepository instructionRepository)
        {
            _recipeRepository = recipeRepository;
            _ingredientRepository = ingredientRepository;
            _instructionRepository = instructionRepository;
        }

        public async Task<OperationResult<List<RecipeResponseDto>>> GetAllAsync()
        {
            var recipes = await _recipeRepository.GetAllAsync();

            var result = recipes.Select(r => new RecipeResponseDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                CookingTimeMinutes = r.CookingTimeMinutes
            }).ToList();

            return OperationResult<List<RecipeResponseDto>>.Success(result);
        }

        public async Task<OperationResult<RecipeResponseDto>> GetByIdAsync(int id)
        {
            var recipe = await _recipeRepository.GetByIdAsync(id);

            if (recipe == null)
                return OperationResult<RecipeResponseDto>.Failure("Recipe not found");

            return OperationResult<RecipeResponseDto>.Success(new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                CookingTimeMinutes = recipe.CookingTimeMinutes
            });
        }

        public async Task<OperationResult<CreateResponseDto>> CreateAsync(CreateRecipeDto dto)
        {
            var recipe = new Recipe
            {
                Name = dto.Name,
                Description = dto.Description,
                CookingTimeMinutes = dto.CookingTimeMinutes
            };

            await _recipeRepository.AddAsync(recipe);
            return OperationResult<CreateResponseDto>.Success(
            new CreateResponseDto { Id = recipe.Id }
);
        }
        public async Task<OperationResult<RecipeDetailDto>> GetFullRecipeByIdAsync(int id)
        {
            var recipe = await _recipeRepository.GetByIdAsync(id);

            if (recipe == null)
                return OperationResult<RecipeDetailDto>.Failure("Recipe not found");

            var ingredients = await _ingredientRepository.GetByRecipeIdAsync(id);
            var instructions = await _instructionRepository.GetByRecipeIdAsync(id);

            return OperationResult<RecipeDetailDto>.Success(new RecipeDetailDto
            {
                Id = recipe.Id,
                Name = recipe.Name,

                Ingredients = ingredients.Select(i => new IngredientResponseDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Amount = i.Amount,
                    Unit = i.Unit,
                    RecipeId = i.RecipeId
                }).ToList(),

                Instructions = instructions.Select(i => new InstructionResponseDto
                {
                    Id = i.Id,
                    StepNumber = i.StepNumber,
                    Description = i.Description,
                    RecipeId = i.RecipeId
                }).ToList()
            });
        }
        public async Task<OperationResult<bool>> UpdateAsync(int id, CreateRecipeDto dto)
        {
            var recipe = await _recipeRepository.GetByIdAsync(id);

            if (recipe == null)
                return OperationResult<bool>.Failure("Recipe not found");

            recipe.Name = dto.Name;
            recipe.Description = dto.Description;
            recipe.CookingTimeMinutes = dto.CookingTimeMinutes;

            await _recipeRepository.UpdateAsync(recipe);
            return OperationResult<bool>.Success(true);
        }
        public async Task<OperationResult<bool>> DeleteAsync(int id)
        {
            var recipe = await _recipeRepository.GetByIdAsync(id);

            if (recipe == null)
                return OperationResult<bool>.Failure("Recipe not found");

            await _recipeRepository.DeleteAsync(id);

            return OperationResult<bool>.Success(true);
        }
    }
}