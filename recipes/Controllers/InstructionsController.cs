using Microsoft.AspNetCore.Mvc;
using recipes.DTO.Instructions;
using recipes.Interfaces;

namespace recipes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstructionsController : ControllerBase
    {
        private readonly IInstructionService _instructionService;

        public InstructionsController(IInstructionService instructionService)
        {
            _instructionService = instructionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _instructionService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var instruction = await _instructionService.GetByIdAsync(id);

            if (instruction == null)
                return NotFound();

            return Ok(instruction);
        }

        [HttpGet("recipe/{recipeId}")]
        public async Task<IActionResult> GetByRecipeId(int recipeId)
        {
            return Ok(await _instructionService.GetByRecipeIdAsync(recipeId));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateInstructionDto dto)
        {
            await _instructionService.CreateAsync(dto);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
                [FromRoute] int id,
                [FromBody] UpdateInstructionDto dto)
        {
            await _instructionService.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _instructionService.DeleteAsync(id);
            return NoContent();
        }
    }
}