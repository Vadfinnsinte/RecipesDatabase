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

        public async Task<IEnumerable<RecipeResponseDto>> GetAllAsync()
        {
            var recipes = await _recipeRepository.GetAllAsync();

            return recipes.Select(r => new RecipeResponseDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                CookingTimeMinutes = r.CookingTimeMinutes
            });
        }

        public async Task<RecipeResponseDto?> GetByIdAsync(int id)
        {
            var recipe = await _recipeRepository.GetByIdAsync(id);

            if (recipe == null)
                return null;

            return new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                CookingTimeMinutes = recipe.CookingTimeMinutes
            };
        }

        public async Task CreateAsync(CreateRecipeDto dto)
        {
            var recipe = new Recipe
            {
                Name = dto.Name,
                Description = dto.Description,
                CookingTimeMinutes = dto.CookingTimeMinutes
            };

            await _recipeRepository.AddAsync(recipe);
        }
        public async Task<RecipeDetailDto?> GetFullRecipeByIdAsync(int id)
        {
            var recipe = await _recipeRepository.GetByIdAsync(id);

            if (recipe == null)
                return null;

            var ingredients = await _ingredientRepository.GetByRecipeIdAsync(id);
            var instructions = await _instructionRepository.GetByRecipeIdAsync(id);

            return new RecipeDetailDto
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
            };
        }
        public async Task DeleteAsync(int id)
        {
            await _recipeRepository.DeleteAsync(id);
        }
    }
}