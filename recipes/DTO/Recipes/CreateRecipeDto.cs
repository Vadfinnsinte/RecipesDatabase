namespace recipes.DTO.Recipes
{
    public class CreateRecipeDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int CookingTimeMinutes { get; set; }
    }
}
