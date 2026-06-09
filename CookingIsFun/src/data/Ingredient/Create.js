const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const createIngredient = async (ingredient, recipeId) => {
  const response = await fetch(`${ConnectionString}/Ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
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
