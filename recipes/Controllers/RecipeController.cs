using Microsoft.AspNetCore.Http.HttpResults;
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
            var result = await _recipeService.GetAllAsync();
            if (!result.IsSuccess)
                return BadRequest(result.Errors);

            return Ok(result.Data); ;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _recipeService.GetByIdAsync(id);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }
        [HttpGet("{id:int}/full")]
        public async Task<IActionResult> GetFullRecipe(int id)
        {
            var result = await _recipeService.GetFullRecipeByIdAsync(id);

            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRecipeDto dto)
        {
            var result = await _recipeService.CreateAsync(dto);
            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateRecipeDto dto)
        {
            var result = await _recipeService.UpdateAsync(id, dto);
            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _recipeService.DeleteAsync(id);
            if (!result.IsSuccess)
                return NotFound(result.Errors);

            return Ok(result.Data);
        }
    }
}