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
      throw new Error("Server error, försök igen senare");
    } else if (response.status === 400) {
      throw new Error(
        "Namn måste ha minst 2, max 100 tecken | Mängd minst 0.1, max 10000 | Mått måste finnas. ",
      );
    } else {
      throw new Error(data?.message || "Något gick fel, försök igen senare");
    }
  }

  return data;
};
