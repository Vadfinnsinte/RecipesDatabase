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
      throw new Error("Server error, try again later");
    }
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};
