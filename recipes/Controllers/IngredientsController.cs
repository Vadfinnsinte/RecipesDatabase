using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using recipes.DTO.Ingredients;
using recipes.Interfaces;

namespace recipes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientService _service;

        public IngredientsController(IIngredientService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();

            if (!result.IsSuccess)
                return BadRequest(result.Errors);

            return Ok(result.Data);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }

        [HttpGet("recipe/{recipeId:int}")]
        public async Task<IActionResult> GetByRecipeId(int recipeId)
        {
            var result = await _service.GetByRecipeIdAsync(recipeId);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateIngredientDto dto)
        {
            var result = await _service.CreateAsync(dto);

            if (!result.IsSuccess)
                return BadRequest(result.Errors);

            return Ok(result.Data);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateIngredientDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return NoContent();
        }
    }
}