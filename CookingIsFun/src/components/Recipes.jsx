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
    } catch (error) {
      setErrorTxt("Något gick fel, försök igen senare.-");
    } finally {
      setLoading(false);
      console.log(recipes);
    }
  };

  // const recipes = [
  //   {
  //     name: "Svampsås",
  //     description: "En smakrik enkel svamsås som passar till det mesta.",
  //     time: 15,
  //     timeUnit: "min",
  //     ingredients: [
  //       {
  //         name: "Grädde",
  //         amount: 3,
  //         unit: "dl",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "Svampbuljong",
  //         amount: 1,
  //         unit: "tärning",
  //         description: "smaka av lägg till mer om du önskar en starkare smak ",
  //         optional: false,
  //       },
  //       {
  //         name: "Soja",
  //         amount: 0,
  //         unit: "En skvätt",
  //         description:
  //           "detta är mest för lite sälta och färg, börja med pyttelite",
  //         optional: false,
  //       },
  //       {
  //         name: "Maizena. ",
  //         amount: 1,
  //         unit: "tsk",
  //         description:
  //           "detta är mest för lite sälta och färg, börja med pyttelite",
  //         optional: false,
  //       },
  //       {
  //         name: "paprikapulver",
  //         amount: 0,
  //         unit: "",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "vitpeppar",
  //         amount: 0,
  //         unit: "",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "champinjoner",
  //         amount: 200,
  //         unit: "g",
  //         description: "",
  //         optional: true,
  //       },
  //     ],
  //     steps: [
  //       {
  //         instruction:
  //           "Skär upp och fräs svampen i smör i en kastrull . tillsätt maizena och rör om ordentligt så det ej är några klumpar.",
  //         order: 0,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "häll grädde i kastrullen och tillsätt buljongtärning, låt koka upp.",
  //         order: 1,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Tillsätt en skvätt soja. ",
  //         order: 2,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "Smaka av, tillsätt mer svampbuljong eller soja om det behövs.  ",
  //         order: 3,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Tillsätt paprikapulver och vitpeppar. smaka av igen.  ",
  //         order: 4,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "(hoppa över om du gjorde steg 0) Blanda maizenan i en skvätt kallt vatten tillsätt sedan i puttrande sås och rör om ordentligt.",
  //         order: 5,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Servera och NJUT!",
  //         order: 6,
  //         tip: "Passar bra till kött, kyckling, pasta och mycket mer.",
  //       },
  //     ],
  //     other: "",
  //     category: ["Sås"],
  //   },
  //   {
  //     name: "Svampsås",
  //     description: "En smakrik enkel svamsås som passar till det mesta.",
  //     time: 15,
  //     timeUnit: "min",
  //     ingredients: [
  //       {
  //         name: "Grädde",
  //         amount: 3,
  //         unit: "dl",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "Svampbuljong",
  //         amount: 1,
  //         unit: "tärning",
  //         description: "smaka av lägg till mer om du önskar en starkare smak ",
  //         optional: false,
  //       },
  //       {
  //         name: "Soja",
  //         amount: 0,
  //         unit: "En skvätt",
  //         description:
  //           "detta är mest för lite sälta och färg, börja med pyttelite",
  //         optional: false,
  //       },
  //       {
  //         name: "Maizena. ",
  //         amount: 1,
  //         unit: "tsk",
  //         description:
  //           "detta är mest för lite sälta och färg, börja med pyttelite",
  //         optional: false,
  //       },
  //       {
  //         name: "paprikapulver",
  //         amount: 0,
  //         unit: "",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "vitpeppar",
  //         amount: 0,
  //         unit: "",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "champinjoner",
  //         amount: 200,
  //         unit: "g",
  //         description: "",
  //         optional: true,
  //       },
  //     ],
  //     steps: [
  //       {
  //         instruction:
  //           "Skär upp och fräs svampen i smör i en kastrull . tillsätt maizena och rör om ordentligt så det ej är några klumpar.",
  //         order: 0,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "häll grädde i kastrullen och tillsätt buljongtärning, låt koka upp.",
  //         order: 1,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Tillsätt en skvätt soja. ",
  //         order: 2,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "Smaka av, tillsätt mer svampbuljong eller soja om det behövs.  ",
  //         order: 3,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Tillsätt paprikapulver och vitpeppar. smaka av igen.  ",
  //         order: 4,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "(hoppa över om du gjorde steg 0) Blanda maizenan i en skvätt kallt vatten tillsätt sedan i puttrande sås och rör om ordentligt.",
  //         order: 5,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Servera och NJUT!",
  //         order: 6,
  //         tip: "Passar bra till kött, kyckling, pasta och mycket mer.",
  //       },
  //     ],
  //     other: "",
  //     category: ["Sås"],
  //   },
  //   {
  //     name: "Svampsås",
  //     description: "En smakrik enkel svamsås som passar till det mesta.",
  //     time: 15,
  //     timeUnit: "min",
  //     ingredients: [
  //       {
  //         name: "Grädde",
  //         amount: 3,
  //         unit: "dl",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "Svampbuljong",
  //         amount: 1,
  //         unit: "tärning",
  //         description: "smaka av lägg till mer om du önskar en starkare smak ",
  //         optional: false,
  //       },
  //       {
  //         name: "Soja",
  //         amount: 0,
  //         unit: "En skvätt",
  //         description:
  //           "detta är mest för lite sälta och färg, börja med pyttelite",
  //         optional: false,
  //       },
  //       {
  //         name: "Maizena. ",
  //         amount: 1,
  //         unit: "tsk",
  //         description:
  //           "detta är mest för lite sälta och färg, börja med pyttelite",
  //         optional: false,
  //       },
  //       {
  //         name: "paprikapulver",
  //         amount: 0,
  //         unit: "",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "vitpeppar",
  //         amount: 0,
  //         unit: "",
  //         description: "",
  //         optional: false,
  //       },
  //       {
  //         name: "champinjoner",
  //         amount: 200,
  //         unit: "g",
  //         description: "",
  //         optional: true,
  //       },
  //     ],
  //     steps: [
  //       {
  //         instruction:
  //           "Skär upp och fräs svampen i smör i en kastrull . tillsätt maizena och rör om ordentligt så det ej är några klumpar.",
  //         order: 0,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "häll grädde i kastrullen och tillsätt buljongtärning, låt koka upp.",
  //         order: 1,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Tillsätt en skvätt soja. ",
  //         order: 2,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "Smaka av, tillsätt mer svampbuljong eller soja om det behövs.  ",
  //         order: 3,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Tillsätt paprikapulver och vitpeppar. smaka av igen.  ",
  //         order: 4,
  //         tip: "",
  //       },
  //       {
  //         instruction:
  //           "(hoppa över om du gjorde steg 0) Blanda maizenan i en skvätt kallt vatten tillsätt sedan i puttrande sås och rör om ordentligt.",
  //         order: 5,
  //         tip: "",
  //       },
  //       {
  //         instruction: "Servera och NJUT!",
  //         order: 6,
  //         tip: "Passar bra till kött, kyckling, pasta och mycket mer.",
  //       },
  //     ],
  //     other: "",
  //     category: ["Sås"],
  //   },
  // ];
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
      <div className="recipe-page-layout">
        <input
          className="search-input"
          type="text"
          placeholder="Sök, kategori, kött, middag.."
        />
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
    </>
  );
};

export default Recipes;
