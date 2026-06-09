import InputLabel from "./InputLabel";

const AddInstruction = ({
  stepNumber,
  setStepNumber,
  stepDescription,
  setStepDescription,
  handleInstructionSave,
  errorInstructionMessage,
  showInstructioError,
}) => {
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
      <button type="button" onClick={handleInstructionSave}>
        Spara
      </button>
      {showInstructioError && (
        <span className="error-m">{errorInstructionMessage}</span>
      )}
    </form>
  );
};

export default AddInstruction;
