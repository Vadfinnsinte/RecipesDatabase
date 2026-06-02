namespace recipes.DTO.Recipes
{
    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CookingTimeMinutes { get; set; }
    }
}
