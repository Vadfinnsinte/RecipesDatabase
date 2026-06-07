import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetEverything } from "../data/Recipe/GetAll";

const Recipe = () => {
  const [loading, setLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState("Loading...");
  const [recipe, setRecipe] = useState({
    ingredients: [],
    instructions: [],
  });
  const { state } = useLocation();
  const navigate = useNavigate();

  const ogrRecipe = state?.recipe;
  const id = state?.recipe.id;

  const fetchRecipe = async () => {
    try {
      setLoading(true);

      const data = await GetEverything(id);
      setRecipe(data);
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

  return (
    <>
      {!loading ? (
        <div className="recipe-layout">
          <div className="text-center">
            <h1>{recipe.name}</h1>
            <h3>{ogrRecipe.cookingTimeMinutes} min</h3>
            <p>{ogrRecipe.description}</p>
          </div>
          <section>
            <div>
              <h2>Ingredienser</h2>
              {recipe.ingredients.map((ingredient) => (
                <p key={ingredient.id}>
                  {`${ingredient.amount !== 0 ? ingredient.amount : ""} ${
                    ingredient.unit
                  } ${ingredient.name}`}
                </p>
              ))}
            </div>

            <div>
              <h2>Gör såhär:</h2>
              {sortedSteps.map((step) => (
                <p key={step.id}>{`${step.stepNumber}. ${step.description}`}</p>
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
