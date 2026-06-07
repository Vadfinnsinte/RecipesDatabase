import InputLabel from "./InputLabel";

const AddIngredient = ({
  ingredientName,
  setIngredientName,
  amount,
  setAmount,
  unit,
  setUnit,
  handleIngredientSave,
}) => {
  return (
    <form>
      <h1>Lägg till Ingrediens</h1>
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
      <button type="button" onClick={handleIngredientSave}>
        Spara
      </button>
      {/* lägg till vad som bestämmer om man ska gå vidare till instruktioner eller fortsätta med ingredient */}
    </form>
  );
};

export default AddIngredient;
