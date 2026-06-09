import { updateInstruction } from "../data/Instruction/Edit";
import InputLabel from "./InputLabel";

const ChangeInstruction = ({
  id,
  stepNumber,
  setStepNumber,
  stepDescription,
  setStepDescription,
  handleInstructionSave,
  fetchRecipe,
  setOpenInstruction,
}) => {
  const saveChange = async () => {
    try {
      let instruction = {
        stepNumber: stepNumber,
        description: stepDescription,
      };

      const data = await updateInstruction(id, instruction);
      await fetchRecipe();

      setOpenInstruction(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form>
      <h1>Lägg till ett instruktions steg</h1>
      <InputLabel
        type={"number"}
        labelTxt={"Instruktions nummer"}
        value={stepNumber}
        setValue={setStepNumber}
      />
      <InputLabel
        type={"text"}
        labelTxt={"Beskrivning"}
        value={stepDescription}
        setValue={setStepDescription}
      />
      <button type="button" onClick={saveChange}>
        Spara
      </button>
    </form>
  );
};
export default ChangeInstruction;
