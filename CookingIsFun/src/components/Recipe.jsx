import { useLocation, useNavigate } from "react-router-dom";

const Recipe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const recipe = state?.recipe;

  if (!recipe) {
    return (
      <>
        <p>Receptet kunde inte hittas</p>
        <button onClick={() => navigate(-1)}> Gå tillbaka </button>
      </>
    );
  }
  let sortedSteps = recipe.steps.sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="recipe-layout">
        <h1> {recipe.name} </h1>
        <section>
          <div>
            <h2>Ingredienser</h2>
            {recipe.ingredients.map((ingredient) => (
              <p key={ingredient.name}>{`${
                ingredient.amount != 0 ? ingredient.amount : ""
              } ${ingredient.unit} ${ingredient.name}`}</p>
            ))}
          </div>
          <div>
            <h2>Gör såhär:</h2>
            {sortedSteps.map((step) => (
              <p key={step.order}>
                {`${step.order}. ${step.instruction} ${
                  step.tip != "" ? step.tip : ""
                }`}{" "}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Recipe;
