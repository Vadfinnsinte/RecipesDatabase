namespace recipes.DTO.Ingredients
{
    public class IngredientResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Unit { get; set; }
        public int RecipeId { get; set; }
    }
}
