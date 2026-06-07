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
      throw new Error("Server error, try again later");
    }
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};
