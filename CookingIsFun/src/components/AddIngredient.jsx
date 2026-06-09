import InputLabel from "./InputLabel";

const AddIngredient = ({
  ingredientName,
  setIngredientName,
  amount,
  setAmount,
  unit,
  setUnit,
  handleIngredientSave,
  errorIngredientMessage,
  showIngredientError,
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
        labelTxt={"Mått(ex dl)"}
        value={unit}
        setValue={setUnit}
      />
      <button type="button" onClick={handleIngredientSave}>
        Spara
      </button>
      {showIngredientError && (
        <span className="error-m">{errorIngredientMessage}</span>
      )}
    </form>
  );
};

export default AddIngredient;
