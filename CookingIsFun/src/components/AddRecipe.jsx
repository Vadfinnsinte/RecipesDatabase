import { useState } from "react";
import AddIngredient from "./AddIngredient";
import AddInstruction from "./AddInstruction";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTimeMinutes, setCookingTimeMinutes] = useState("");

  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");

  const [stepNumber, setStepNumber] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  // Vänta på att recept läggs till, ta tillbaka recept id och lägg sedan in det i instruction och ingredient.

  const [addRecipe, setAddRecipe] = useState(true);
  const [addIngredient, setIngredient] = useState(false);
  const [addInstruction, setAddInstruction] = useState(false);

  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredient] = useState([]);
  const [instructions, setInstruction] = useState([]);

  const [showSavedData, setShowSavedData] = useState(false);

  const onRecipeSave = () => {
    setRecipe({
      name: name,
      description: description,
      cookingTimeMinutes: cookingTimeMinutes,
    });
    setShowSavedData(true);
    setAddRecipe(false);
    setIngredient(true);
  };
  const handleIngredientSave = () => {
    let ingredient = { name: ingredientName, amount: amount, unit: unit };
    setIngredients((prev) => [...prev, ingredient]);
    setIngredientName("");
    setAmount("");
    setUnit("");
    // lägg till vad som bestämmer om man ska gå vidare till instruktioner eller fortsätta med ingredient.
  };
  const handleInstructionSave = () => {};

  return (
    showSavedData && (
      <div>
        <p>{recipe.name}</p>
        <p>{recipe.description}</p>
        <p>{recipe.cookingTimeMinutes}</p>
        <h2>Ingredienser</h2>
        {ingredients.map((i) => (
          <div>
            <p>{i.name}</p>
            <p>{i.amount}</p>
            <p>{i.unit}</p>
          </div>
        ))}
        <h2>Instruktioner</h2>
        {instructions.map((i) => (
          <div>
            <p>{i.stepNumber}</p>
            <p>{i.description}</p>
          </div>
        ))}
      </div>
    ),
    addRecipe && (
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
        <button>Spara</button>
      </form>
    ),
    addIngredient && (
      <AddIngredient
        ingredientName={ingredientName}
        setIngredientName={setIngredientName}
        amount={amount}
        setAmount={setAmount}
        unit={unit}
        setUnit={setUnit}
        handleIngredientSave={handleIngredientSave}
      />
    ),
    addInstruction && (
      <AddInstruction
        stepNumber={stepNumber}
        setStepNumber={setStepNumber}
        stepDescription={stepDescription}
        setStepDescription={setStepDescription}
        handleInstructionSave={handleInstructionSave}
      />
    )
  );
};

export default AddRecipe;
