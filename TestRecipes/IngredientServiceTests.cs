using NSubstitute;
using recipes.Interfaces;
using recipes.Models;
using recipes.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestRecipes
{
    public class IngredientServiceTests
    {
        // Checks if mock repo accepts, and returns expected data
        // Checks if values was what was expected
        [Fact]
        public async Task GetByRecipeId_Should_ReturnIngredients()
        {
            var repo = Substitute.For<IIngredientRepository>();
            var service = new IngredientService(repo);

            repo.GetByRecipeIdAsync(1).Returns(new List<Ingredient>
            {
                new Ingredient { Name = "Flour", RecipeId = 1 }
            });

            var result = await service.GetByRecipeIdAsync(1);

            await repo.Received(1).GetByRecipeIdAsync(1);
            var item = Assert.Single(result);
            Assert.Equal("Flour", item.Name);
            Assert.Equal(1, item.RecipeId);

        }

    }
}
