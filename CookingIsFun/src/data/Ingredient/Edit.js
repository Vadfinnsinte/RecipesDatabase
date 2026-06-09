const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const updateIngredient = async (id, ingredient) => {
  const response = await fetch(`${ConnectionString}/Ingredients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      console.log("Something went wrong");
    }
  }

  return data;
};
