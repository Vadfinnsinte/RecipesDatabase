using System.ComponentModel.DataAnnotations;

namespace recipes.DTO.Instructions
{
    public class UpdateInstructionDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int StepNumber { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(500)]
        public string Description { get; set; }
    }
}