using System.ComponentModel.DataAnnotations;

namespace recipes.DTO.Recipes
{
    public class CreateRecipeDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        [Range(1, 10000)]
        public int CookingTimeMinutes { get; set; }
    }
}
