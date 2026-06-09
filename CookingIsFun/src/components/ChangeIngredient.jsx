import { updateIngredient } from "../data/Ingredient/Edit";
import { GetEverything } from "../data/Recipe/GetAll";
import InputLabel from "./InputLabel";

const ChangeIngredient = ({
  ingredientId,
  ingredientName,
  setIngredientName,
  amount,
  setAmount,
  unit,
  setUnit,
  setOpenIngredient,
  fetchRecipe,
}) => {
  const saveChange = async () => {
    try {
      let ingredient = { name: ingredientName, amount: amount, unit: unit };

      const data = await updateIngredient(ingredientId, ingredient);
      await fetchRecipe();

      setOpenIngredient(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form>
      <h1>Ändra Ingrediens</h1>
      <InputLabel
        type={"text"}
        labelTxt={"Namn"}
        value={ingredientName}
        setValue={setIngredientName}
      />
      <InputLabel
        type={"number"}
        labelTxt={"Mängd"}
        value={amount}
        setValue={setAmount}
      />
      <InputLabel
        type={"text"}
        labelTxt={"Mått typ"}
        value={unit}
        setValue={setUnit}
      />
      <button type="button" onClick={saveChange}>
        Spara
      </button>
    </form>
  );
};

export default ChangeIngredient;
