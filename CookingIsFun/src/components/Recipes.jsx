import "../style/recipes.css";
import placeholerImg from "../assets/godis.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllRecipe } from "../data/Recipe/GetAll";

const Recipes = () => {
  const [loading, setLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState("Loading...");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await GetAllRecipe();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      setErrorTxt("Något gick fel, försök igen senare.");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleGoToRecipe = (recipe) => {
    navigate("/recipe", {
      state: { recipe },
    });
  };
  return (
    <>
      {!loading ? (
        <div className="recipe-page-layout">
          {/* <input
            className="search-input"
            type="text"
            placeholder="Sök, kategori, kött, middag.."
          /> */}
          <div className="recipes-layout">
            {recipes.map((recipe) => (
              <div className="recipe-card" key={recipe.name}>
                <h3 className="name-height">{recipe.name}</h3>
                <p className="margin-p">{recipe.description}</p>
                <p>{recipe.cookingTimeMinutes} min</p>
                <button onClick={() => handleGoToRecipe(recipe)}>
                  Se recept
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading-box">
          <h1>{errorTxt}</h1>
        </div>
      )}
    </>
  );
};

export default Recipes;
