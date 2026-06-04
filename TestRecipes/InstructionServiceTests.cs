
using NSubstitute;
using recipes.DTO.Instructions;
using recipes.Interfaces;
using recipes.Models;
using recipes.Services;

namespace TestRecipes
{
    public class InstructionServiceTests
    {
        // Checks if AddAsync was called once when CreateAsync is executed 
        [Fact]
        public async Task CreateInstruction_Should_SaveInstruction()
        {
            var repo = Substitute.For<IInstructionRepository>();
            var service = new InstructionService(repo);

            var dto = new CreateInstructionDto
            {
                StepNumber = 1,
                Description = "This is a description",
                RecipeId = 1
            };
            await service.CreateAsync(dto);

            await repo.Received(1).AddAsync(Arg.Any<Instruction>());
        }

        //Checks if UppdateAsync was called and if the data was updated
        [Fact]
        public async Task UpdateAsync_Should_UpdateInstruction_When_Valid()
        {
            var instructionRepo = Substitute.For<IInstructionRepository>();
            var service = new InstructionService(instructionRepo);

            var instruction = new Instruction
            {
                Id = 1,
                StepNumber = 1,
                Description = "Old"
            };

            instructionRepo.GetByIdAsync(1).Returns(instruction);

            var dto = new UpdateInstructionDto
            {
                StepNumber = 2,
                Description = "Updated"
            };

            await service.UpdateAsync(1, dto);

            await instructionRepo.Received(1).UpdateAsync(instruction);
            Assert.Equal("Updated", instruction.Description);
            Assert.Equal(2, instruction.StepNumber);

        }
        [Fact]
        public async Task UpdateAsync_Should_ThrowException_When_InstructionNotFound()
        {
            var repo = Substitute.For<IInstructionRepository>();
            var service = new InstructionService(repo);

            repo.GetByIdAsync(1).Returns((Instruction)null);

            var dto = new UpdateInstructionDto
            {
                StepNumber = 2,
                Description = "Updated"
            };

            await Assert.ThrowsAsync<Exception>(() =>
                service.UpdateAsync(1, dto));
        }
    }
}
