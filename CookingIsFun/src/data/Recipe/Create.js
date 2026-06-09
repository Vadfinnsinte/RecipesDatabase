const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const createRecipe = async (recipe) => {
  const response = await fetch(`${ConnectionString}/Recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: recipe.name,
      description: recipe.description,
      cookingTimeMinutes: recipe.cookingTimeMinutes,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, försök igen senare");
    } else if (response.status === 400) {
      throw new Error(
        "Namn måste ha minst 2 max 100 tecken | Beskrivning måste ha minst 5 max 1000 | Tid måste vara minst 1 minut. ",
      );
    }

    throw new Error(data?.message || "Något gick fel, försök igen senare");
  }

  return data;
};
