using recipes.DTO.Recipes;
using recipes.Interfaces;
using recipes.Models;

namespace recipes.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;

        public RecipeService(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
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
    }
}