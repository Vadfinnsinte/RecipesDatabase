import { updateRecipe } from "../data/Recipe/Edit.js";
import { GetEverything } from "../data/Recipe/GetAll.js";
import InputLabel from "./InputLabel";

const ChangeRecipe = ({
  setRecipe,
  id,
  name,
  setName,
  description,
  setDescription,
  cookingTimeMinutes,
  setCookingTimeMinutes,
  setOpenRecipe,
  orgRecipe,
}) => {
  const handleSave = async () => {
    try {
      let recipe = {
        name: name,
        description: description,
        cookingTimeMinutes: cookingTimeMinutes,
      };

      const Updatedata = await updateRecipe(id, recipe);
      const data = await GetEverything(id);
      setRecipe({
        ...data,
        description: description,
        cookingTimeMinutes: cookingTimeMinutes,
      });
      setOpenRecipe(false);
    } catch {
      console.log("error");
    }
  };
  return (
    <form>
      <h1>Ändra recept</h1>
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
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </form>
  );
};

export default ChangeRecipe;
