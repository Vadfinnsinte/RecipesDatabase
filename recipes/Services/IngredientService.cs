using recipes.DTO.Ingredients;
using recipes.Interfaces;
using recipes.Models;

namespace recipes.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _repository;

        public IngredientService(IIngredientRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<IngredientResponseDto>> GetAllAsync()
        {
            var ingredients = await _repository.GetAllAsync();

            return ingredients.Select(MapToDto).ToList();
        }

        public async Task<IngredientResponseDto?> GetByIdAsync(int id)
        {
            var ingredient = await _repository.GetByIdAsync(id);
            return ingredient == null ? null : MapToDto(ingredient);
        }

        public async Task<List<IngredientResponseDto>> GetByRecipeIdAsync(int recipeId)
        {
            var ingredients = await _repository.GetByRecipeIdAsync(recipeId);
            return ingredients.Select(MapToDto).ToList();
        }

        public async Task CreateAsync(CreateIngredientDto dto)
        {
            var ingredient = new Ingredient
            {
                Name = dto.Name,
                Amount = dto.Amount,
                Unit = dto.Unit,
                RecipeId = dto.RecipeId
            };

            await _repository.AddAsync(ingredient);
        }

        public async Task UpdateAsync(int id, UpdateIngredientDto dto)
        {
            var ingredient = await _repository.GetByIdAsync(id);

            if (ingredient == null)
                throw new Exception("Ingredient not found");

            ingredient.Name = dto.Name;
            ingredient.Amount = dto.Amount;
            ingredient.Unit = dto.Unit;

            await _repository.UpdateAsync(ingredient);
        }

        public async Task DeleteAsync(int id)
        {
            var ingredient = await _repository.GetByIdAsync(id);

            if (ingredient == null)
                throw new Exception("Ingredient not found");

            await _repository.DeleteAsync(id);
        }

        private static IngredientResponseDto MapToDto(Ingredient i)
        {
            return new IngredientResponseDto
            {
                Id = i.Id,
                Name = i.Name,
                Amount = i.Amount,
                Unit = i.Unit,
                RecipeId = i.RecipeId
            };
        }
    }
}