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
           var result = await _instructionService.GetAllAsync();

            if (!result.IsSuccess)
                return BadRequest(result.Errors);

            return Ok(result.Data);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _instructionService.GetByIdAsync(id);


            if (!result.IsSuccess)
                return BadRequest(result.Errors);

            return Ok(result.Data);
        }

        [HttpGet("recipe/{recipeId:int}")]
        public async Task<IActionResult> GetByRecipeId(int recipeId)
        {
            var result = await _instructionService.GetByRecipeIdAsync(recipeId);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateInstructionDto dto)
        {
            await _instructionService.CreateAsync(dto);
            return Created();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
                int id,
                UpdateInstructionDto dto)
        {
            var result = await _instructionService.UpdateAsync(id, dto);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _instructionService.DeleteAsync(id);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return NoContent();
        }
    }
}