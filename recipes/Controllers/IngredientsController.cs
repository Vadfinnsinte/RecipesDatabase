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
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ingredient = await _service.GetByIdAsync(id);

            if (ingredient == null)
                return NotFound();

            return Ok(ingredient);
        }

        [HttpGet("recipe/{recipeId:int}")]
        public async Task<IActionResult> GetByRecipeId(int recipeId)
        {
            return Ok(await _service.GetByRecipeIdAsync(recipeId));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateIngredientDto dto)
        {
            await _service.CreateAsync(dto);
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateIngredientDto dto)
        {
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}