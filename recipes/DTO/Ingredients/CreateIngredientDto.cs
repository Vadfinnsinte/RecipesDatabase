using System.ComponentModel.DataAnnotations;

namespace recipes.DTO.Ingredients
{
    public class CreateIngredientDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [Range(0.01, 10000)]
        public decimal Amount { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(10)]
        public string Unit { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int RecipeId { get; set; }
    }
}
