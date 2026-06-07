using recipes.Common;
using recipes.DTO;
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

        public async Task<OperationResult<List<IngredientResponseDto>>> GetAllAsync()
        {
            var ingredients = await _repository.GetAllAsync();
            var result = ingredients.Select(MapToDto).ToList();

            return OperationResult<List<IngredientResponseDto>>.Success(result);
        }

        public async Task<OperationResult<IngredientResponseDto>> GetByIdAsync(int id)
        {
            var ingredient = await _repository.GetByIdAsync(id);

            if (ingredient == null)
                return OperationResult<IngredientResponseDto>.Failure("Ingredient not found");

            return OperationResult<IngredientResponseDto>.Success(MapToDto(ingredient));
        }

        public async Task<OperationResult<List<IngredientResponseDto>>> GetByRecipeIdAsync(int recipeId)
        {
            var ingredients = await _repository.GetByRecipeIdAsync(recipeId);
            var result = ingredients.Select(MapToDto).ToList();

            return OperationResult<List<IngredientResponseDto>>.Success(result);
        }

        public async Task<OperationResult<CreateResponseDto>> CreateAsync(CreateIngredientDto dto)
        {
            var ingredient = new Ingredient
            {
                Name = dto.Name,
                Amount = dto.Amount,
                Unit = dto.Unit,
                RecipeId = dto.RecipeId
            };

            await _repository.AddAsync(ingredient);
            return OperationResult<CreateResponseDto>.Success(
       new CreateResponseDto
       {
           Id = ingredient.Id
       }
   );
        }

        public async Task<OperationResult<bool>> UpdateAsync(int id, UpdateIngredientDto dto)
        {
            var ingredient = await _repository.GetByIdAsync(id);

            if (ingredient == null)
                return OperationResult<bool>.Failure("Ingredient not found");

            ingredient.Name = dto.Name;
            ingredient.Amount = dto.Amount;
            ingredient.Unit = dto.Unit;

            await _repository.UpdateAsync(ingredient);
            return OperationResult<bool>.Success(true);
        }

        public async Task<OperationResult<bool>> DeleteAsync(int id)
        {
            var ingredient = await _repository.GetByIdAsync(id);

            if (ingredient == null)
                return OperationResult<bool>.Failure("Ingredient not found");

            await _repository.DeleteAsync(id);
            return OperationResult<bool>.Success(true);
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