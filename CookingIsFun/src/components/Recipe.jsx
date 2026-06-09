import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetEverything } from "../data/Recipe/GetAll";
import ChangeRecipe from "./ChangeRecipe";
import ChangeIngredient from "./ChangeIngredient";
import ChangeInstruction from "./ChangeInstruction";
import { deleteRecipeIngIns } from "../data/DeleteRecipeIngIns";

const Recipe = () => {
  const [loading, setLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState("Loading...");
  const [recipe, setRecipe] = useState({
    ingredients: [],
    instructions: [],
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTimeMinutes, setCookingTimeMinutes] = useState("");

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [instructionId, setInstructionId] = useState("");
  const [stepNumber, setStepNumber] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  const [openRecipe, setOpenRecipe] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openInstruction, setOpenInstruction] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();

  let ogrRecipe = state?.recipe;

  const id = state?.recipe.id;

  const fetchRecipe = async () => {
    try {
      setLoading(true);

      const data = await GetEverything(id);
      setRecipe({
        ...data,
        description: ogrRecipe.description,
        cookingTimeMinutes: ogrRecipe.cookingTimeMinutes,
      });
      setLoading(false);
    } catch (error) {
      setErrorTxt("Något gick fel, försök igen senare.");
    }
  };

  if (!id) {
    return (
      <>
        <p>Receptet kunde inte hittas</p>
        <button onClick={() => navigate(-1)}> Gå tillbaka </button>
      </>
    );
  }
  useEffect(() => {
    fetchRecipe();
  }, []);

  let sortedSteps = [...(recipe.instructions ?? [])].sort(
    (a, b) => a.stepNumber - b.stepNumber,
  );
  const handleChangeRecipe = () => {
    setOpenRecipe(true);
    setCookingTimeMinutes(ogrRecipe.cookingTimeMinutes);
    setName(recipe.name);
    setDescription(ogrRecipe.description);
  };
  const handleChangeIngredient = (ingredient) => {
    setIngredientId(ingredient.id);
    setIngredientName(ingredient.name);
    setAmount(ingredient.amount);
    setUnit(ingredient.unit);
    setOpenIngredient(true);
  };
  const handleChangeInstruction = (step) => {
    setInstructionId(step.id);
    setStepNumber(step.stepNumber);
    setStepDescription(step.description);
    setOpenInstruction(true);
  };
  const handleDelete = async () => {
    try {
      const data = await deleteRecipeIngIns(id);
      navigate("/recipes");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {!loading ? (
        <div className="recipe-layout">
          <div className="text-center">
            <div className="grid-r">
              <div className="start">
                <button className="red" onClick={() => setOpenDelete(true)}>
                  Radera
                </button>
              </div>
              <h1>{recipe.name}</h1>
              <div className="flex-end">
                <button onClick={handleChangeRecipe}>Ändra</button>
              </div>
            </div>
            <h3>{recipe.cookingTimeMinutes} min</h3>
            <p>{recipe.description}</p>
          </div>
          {openDelete && (
            <div className="absolut-change">
              <div className="ep">
                <div>
                  <p>Är du säker? detta går inte ångra</p>
                  <div className="flex-r">
                    <button onClick={() => setOpenDelete(false)}>Avbryt</button>
                    <button className="red" onClick={handleDelete}>
                      Radera
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {openRecipe && (
            <div className="absolut-change ">
              <div className="place-right">
                <button className="red " onClick={() => setOpenRecipe(false)}>
                  Stäng
                </button>
              </div>
              <ChangeRecipe
                setRecipe={setRecipe}
                id={id}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                cookingTimeMinutes={cookingTimeMinutes}
                setCookingTimeMinutes={setCookingTimeMinutes}
                setOpenRecipe={setOpenRecipe}
                ogrRecipe={ogrRecipe}
              />
            </div>
          )}
          <section>
            <div>
              {openIngredient && (
                <div className="absolut-change ">
                  <div className="place-right">
                    <button
                      className="red "
                      onClick={() => setOpenIngredient(false)}
                    >
                      Stäng
                    </button>
                  </div>
                  <ChangeIngredient
                    ingredientId={ingredientId}
                    ingredientName={ingredientName}
                    setIngredientName={setIngredientName}
                    amount={amount}
                    setAmount={setAmount}
                    unit={unit}
                    setUnit={setUnit}
                    setOpenIngredient={setOpenIngredient}
                    fetchRecipe={fetchRecipe}
                  />
                </div>
              )}

              <h2>Ingredienser</h2>
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex-r">
                  <p>
                    {`${ingredient.amount !== 0 ? ingredient.amount : ""} ${
                      ingredient.unit
                    } ${ingredient.name}`}
                  </p>
                  <div>
                    <button onClick={() => handleChangeIngredient(ingredient)}>
                      Ändra
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {openInstruction && (
                <div className="absolut-change ">
                  <div className="place-right">
                    <button
                      className="red "
                      onClick={() => setOpenInstruction(false)}
                    >
                      Stäng
                    </button>
                  </div>
                  <ChangeInstruction
                    id={instructionId}
                    stepNumber={stepNumber}
                    setStepNumber={setStepNumber}
                    stepDescription={stepDescription}
                    setStepDescription={setStepDescription}
                    fetchRecipe={fetchRecipe}
                    setOpenInstruction={setOpenInstruction}
                  />
                </div>
              )}
              <h2>Gör såhär:</h2>
              {sortedSteps.map((step) => (
                <div key={step.id} className="flex-r">
                  <p>{`${step.stepNumber}. ${step.description}`}</p>
                  <div>
                    <button onClick={() => handleChangeInstruction(step)}>
                      Ändra
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="loading-box">
          <h1>{errorTxt}</h1>
        </div>
      )}
    </>
  );
};

export default Recipe;
