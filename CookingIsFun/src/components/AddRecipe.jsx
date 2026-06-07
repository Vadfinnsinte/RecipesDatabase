import { useState } from "react";
import AddIngredient from "./AddIngredient";
import AddInstruction from "./AddInstruction";
import { createIngredient } from "../data/Ingredient/Create";
import { createInstruction } from "../data/Instruction/Create";
import InputLabel from "./InputLabel";
import { createRecipe } from "../data/Recipe/Create";

const AddRecipe = () => {
  const [recipeId, setRecipeId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTimeMinutes, setCookingTimeMinutes] = useState("");

  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");

  const [stepNumber, setStepNumber] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  const [addRecipe, setAddRecipe] = useState(true);
  const [addIngredient, setIngredient] = useState(false);
  const [addInstruction, setAddInstruction] = useState(false);

  const [recipe, setRecipe] = useState("");
  const [ingredientIds, setIngredientIds] = useState([]);
  const [instructionsIds, setInstructionIds] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const [showSavedData, setShowSavedData] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [boxTxt, setBoxTxt] = useState("");

  const [anotherInstruction, setAnotherInstruction] = useState(false);

  const onRecipeSave = async () => {
    const recipeData = {
      name,
      description,
      cookingTimeMinutes,
    };
    setRecipe(recipeData);

    try {
      const result = await createRecipe(recipe);
      setRecipeId(result.id);
      setShowSavedData(true);
      setAddRecipe(false);
      setIngredient(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleIngredientSave = async () => {
    let ingredient = { name: ingredientName, amount: amount, unit: unit };
    try {
      let response = await createIngredient(ingredient, recipeId);
      setIngredientIds((prev) => [...prev, response.id]);
      setIngredients((prev) => [...prev, ingredient]);
      setIngredientName("");
      setAmount("");
      setUnit("");
      setShowBox(true);
      setBoxTxt("ingredienser");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleInstructionSave = async () => {
    let instruction = { stepNumber: stepNumber, description: stepDescription };
    try {
      let response = await createInstruction(instruction, recipeId);
      setInstructionIds((prev) => [...prev, response.id]);
      setInstructions((prev) => [...prev, instruction]);
      setStepNumber("");
      setStepDescription("");
      setAnotherInstruction(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleYes = () => {
    setIngredient(false);
    setAddInstruction(true);
    setShowBox(false);
  };
  const handleDone = () => {
    // Gör en popup som är på timeuot, navigera sedan till receptsidan.
  };

  return (
    <>
      {/* lägg till en Avsluta knapp, radera osparad data   */}
      <section className="home-page">
        {addRecipe && (
          <form>
            <h1>Lägg till nytt recept</h1>
            <InputLabel
              type={"text"}
              labelTxt={"Namn"}
              value={name}
              setValue={setName}
            />
            <InputLabel
              type={"text"}
              labelTxt={"Beskrivning"}
              value={description}
              setValue={setDescription}
            />
            <InputLabel
              type={"number"}
              labelTxt={"Tid (i minuter)"}
              value={cookingTimeMinutes}
              setValue={setCookingTimeMinutes}
            />
            <button type="button" onClick={onRecipeSave}>
              Spara
            </button>
          </form>
        )}
        {addIngredient && (
          <AddIngredient
            ingredientName={ingredientName}
            setIngredientName={setIngredientName}
            amount={amount}
            setAmount={setAmount}
            unit={unit}
            setUnit={setUnit}
            handleIngredientSave={handleIngredientSave}
          />
        )}
        {addInstruction && (
          <AddInstruction
            stepNumber={stepNumber}
            setStepNumber={setStepNumber}
            stepDescription={stepDescription}
            setStepDescription={setStepDescription}
            handleInstructionSave={handleInstructionSave}
          />
        )}
        {showBox && (
          <div>
            <p>Gå vidare till lägg till Instruktioner?</p>

            <button onClick={handleYes}>Ja</button>
          </div>
          //   behövs nog inte. Bara en gå vidare till instruktioner knapp. Sedan en granska recept. sedan spara, ändra eller ta bort.
        )}
      </section>
      {showSavedData && (
        <div className="saved-data">
          <div className="text-center">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <p>{recipe.cookingTimeMinutes} min</p>
          </div>
          <div>
            <h2>Ingredienser</h2>
            {ingredients?.map((i) => (
              <div className="container-p">
                <p className="m-r">{i.name},</p>
                <p>{i.amount}</p>
                <p>{i.unit}.</p>
              </div>
            ))}
          </div>
          <div>
            <h2>Instruktioner</h2>
            {instructions?.map((i) => (
              <div className="container-p">
                <p className="m-r">{i.stepNumber}</p>
                <p>{i.description}</p>
              </div>
            ))}
          </div>
          {anotherInstruction && (
            <div className="done">
              <p>Klar med ditt recept? </p>

              <button onClick={handleDone}>Klicka här</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddRecipe;
