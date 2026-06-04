using Microsoft.AspNetCore.Mvc;
using recipes.DTO.Recipes;
using recipes.Interfaces;

namespace recipes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var recipes = await _recipeService.GetAllAsync();
            return Ok(recipes);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var recipe = await _recipeService.GetByIdAsync(id);

            if (recipe == null)
                return NotFound();

            return Ok(recipe);
        }
        [HttpGet("{id:int}/full")]
        public async Task<IActionResult> GetFullRecipe(int id)
        {
            var recipe = await _recipeService.GetFullRecipeByIdAsync(id);

            if (recipe == null)
                return NotFound();

            return Ok(recipe);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRecipeDto dto)
        {
            await _recipeService.CreateAsync(dto);
            return Ok();
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _recipeService.DeleteAsync(id);
            return NoContent();
        }
    }
}