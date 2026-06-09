const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const createInstruction = async (instruction, recipeId) => {
  const response = await fetch(`${ConnectionString}/Instructions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stepNumber: instruction.stepNumber,
      description: instruction.description,
      recipeId: recipeId,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, försök igen senare");
    } else if (response.status === 400) {
      throw new Error(
        "Måste ha steg nummmr | Beskrivning måste ha minst 5 max 500 tecken |",
      );
    }

    throw new Error(data?.message || "Något gick fel, försök igen senare");
  }

  return data;
};
