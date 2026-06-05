using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.AspNetCore.SignalR;
using NSubstitute;
using recipes.DTO.Recipes;
using recipes.Interfaces;
using recipes.Models;
using recipes.Services;

namespace TestRecipes
{
    public class RecipeServiceTests
    {
        // Checks if AddAsync was called
        // Checks AddAsync was called from correct dependecy(recipeRepo)
        // Checks AddAsync was called once
        // Checks DTO to Recipe has correct mapping
        [Fact]
        public async Task CreateAsync_Should_CallRepository_When_ValidDto()
        {
            var recipeRepo = Substitute.For<IRecipeRepository>();
            var ingredientRepo = Substitute.For<IIngredientRepository>();
            var instructionRepo = Substitute.For<IInstructionRepository>();

            var service = new RecipeService(recipeRepo, ingredientRepo, instructionRepo);

            var dto = new CreateRecipeDto
            {
                Name = "Pizza",
                Description = "Good pizza",
                CookingTimeMinutes = 30
            };

            await service.CreateAsync(dto);

            await recipeRepo.Received(1).AddAsync(
                Arg.Is<Recipe>(r => 
                r.Name == "Pizza" && r.Description == "Good pizza" && r.CookingTimeMinutes == 30));
        }
        [Fact]
        // Checks for failure after calling id that is not found by repository.
        public async Task GetByIdAsync_Should_ReturnFailure_When_NotFound()
        {
            var recipeRepo = Substitute.For<IRecipeRepository>();
            var ingredientRepo = Substitute.For<IIngredientRepository>();
            var instructionRepo = Substitute.For<IInstructionRepository>();

            var service = new RecipeService(recipeRepo, ingredientRepo, instructionRepo);

            recipeRepo.GetByIdAsync(1).Returns((Recipe)null);

            
            var result = await service.GetByIdAsync(1);

            Assert.False(result.IsSuccess);
            Assert.Contains("Recipe not found", result.Errors);
        }
    }
    
}
