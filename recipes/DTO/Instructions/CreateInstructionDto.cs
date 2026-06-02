namespace recipes.DTO.Instructions
{
    public class CreateInstructionDto
    {
        public int StepNumber { get; set; }
        public string Description { get; set; }
        public int RecipeId { get; set; }
    }
}