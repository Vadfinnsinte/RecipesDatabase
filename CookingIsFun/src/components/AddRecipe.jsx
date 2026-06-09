import { useState } from "react";
import AddIngredient from "./AddIngredient";
import AddInstruction from "./AddInstruction";
import { createIngredient } from "../data/Ingredient/Create";
import { createInstruction } from "../data/Instruction/Create";
import InputLabel from "./InputLabel";
import { createRecipe } from "../data/Recipe/Create";
import { useNavigate } from "react-router-dom";
import SaveData from "./SavedData";

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
  const [done, setDone] = useState(false);
  const [boxTxt, setBoxTxt] = useState("");

  const [anotherInstruction, setAnotherInstruction] = useState(false);
  const [errorRecipeMessage, setErrorRecipeMessage] =
    useState("Något gick fel.");
  const [errorIngredientMessage, setErroIngredientMessage] =
    useState("Något gick fel.");
  const [errorInstructionMessage, setErroInstructionMessage] =
    useState("Något gick fel.");
  const [showRecipeError, setShowRecipeError] = useState(false);
  const [showIngredientError, setShowIngredientError] = useState(false);
  const [showInstructioError, setShowInstructioError] = useState(false);
  const navigate = useNavigate();
  const resetError = () => {
    setShowRecipeError(false);
    setShowIngredientError(false);
    setShowInstructioError(false);
  };
  const onRecipeSave = async () => {
    resetError();
    const recipeData = {
      name,
      description,
      cookingTimeMinutes,
    };
    setRecipe(recipeData);

    try {
      const result = await createRecipe(recipeData);
      setRecipeId(result.id);
      setShowSavedData(true);
      setAddRecipe(false);
      setIngredient(true);
    } catch (error) {
      setShowRecipeError(true);
      setErrorRecipeMessage(error.message);
    }
  };
  const handleIngredientSave = async () => {
    resetError();
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
      setShowIngredientError(true);
      setErroIngredientMessage(error.message);
    }
  };
  const handleInstructionSave = async () => {
    resetError();
    let instruction = { stepNumber: stepNumber, description: stepDescription };
    try {
      let response = await createInstruction(instruction, recipeId);
      setInstructionIds((prev) => [...prev, response.id]);
      setInstructions((prev) => [...prev, instruction]);
      setStepNumber("");
      setStepDescription("");
      setAnotherInstruction(true);
    } catch (error) {
      setShowInstructioError(true);
      setErroInstructionMessage(error.message);
    }
  };
  const handleYes = () => {
    setIngredient(false);
    setAddInstruction(true);
    setShowBox(false);
  };
  const handleDone = () => {
    setAddInstruction(false);
    setShowSavedData(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <section className="home-page flex-c">
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
            {showRecipeError && (
              <span className="error-m">{errorRecipeMessage}</span>
            )}
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
            errorIngredientMessage={errorIngredientMessage}
            showIngredientError={showIngredientError}
          />
        )}
        {addInstruction && (
          <AddInstruction
            stepNumber={stepNumber}
            setStepNumber={setStepNumber}
            stepDescription={stepDescription}
            setStepDescription={setStepDescription}
            handleInstructionSave={handleInstructionSave}
            errorInstructionMessage={errorInstructionMessage}
            showInstructioError={showInstructioError}
          />
        )}
        {showBox && (
          <div>
            <p>Gå vidare till lägg till Instruktioner?</p>

            <button onClick={handleYes}>Ja</button>
          </div>
        )}
        {anotherInstruction && (
          <div className="done">
            {done ? (
              <p>Sparar data... </p>
            ) : (
              <div>
                <p>Klar med ditt recept? </p>

                <button onClick={handleDone}>Klicka här</button>
              </div>
            )}
          </div>
        )}
      </section>
      {showSavedData && (
        <SaveData
          recipe={recipe}
          ingredients={ingredients}
          instructions={instructions}
        />
      )}
    </>
  );
};

export default AddRecipe;
