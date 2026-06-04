using recipes.DTO.Ingredients;
using recipes.DTO.Instructions;

namespace recipes.DTO.Recipes
{
    public class RecipeDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<IngredientResponseDto> Ingredients { get; set; }
        public List<InstructionResponseDto> Instructions { get; set; }
    }
}