const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const updateRecipe = async (id, recipe) => {
  const response = await fetch(`${ConnectionString}/Recipes/${id}`, {
    method: "PUT",
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
      throw new Error("Server error, try again later");
    }
  }

  return data;
};
