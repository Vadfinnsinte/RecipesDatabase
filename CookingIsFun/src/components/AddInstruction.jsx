const AddInstruction = (
  stepNumber,
  setStepNumber,
  stepDescription,
  setStepDescription,
  handleInstructionSave,
) => {
  <form>
    <h1>Lägg till nytt recept</h1>
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
    <button onClick={handleInstructionSave}>Spara</button>
  </form>;
};

export default AddInstruction;
