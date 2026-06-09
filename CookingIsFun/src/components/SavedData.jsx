const SaveData = ({ recipe, ingredients, instructions }) => {
  return (
    <div className="saved-data">
      <div className="text-center">
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <p>{recipe.cookingTimeMinutes} min</p>
      </div>
      <div>
        <h3>Ingredienser</h3>
        {ingredients?.map((i) => (
          <div key={i.id} className="container-p">
            <p className="m-r">{i.name},</p>
            <p>{i.amount}</p>
            <p>{i.unit}.</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Instruktioner</h3>
        {instructions?.map((i) => (
          <div key={i.id} className="container-p">
            <p className="m-r">{i.stepNumber}.</p>
            <p>{i.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SaveData;
