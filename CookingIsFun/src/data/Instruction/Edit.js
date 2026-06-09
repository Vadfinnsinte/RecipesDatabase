const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const updateInstruction = async (id, instruction) => {
  const response = await fetch(`${ConnectionString}/Instructions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stepNumber: instruction.stepNumber,
      description: instruction.description,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      console.log("Something went erong");
    }
  }

  return data;
};
