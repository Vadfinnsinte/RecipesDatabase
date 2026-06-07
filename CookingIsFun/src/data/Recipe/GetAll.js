const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const GetAllRecipe = async () => {
  const response = await fetch(`${ConnectionString}/Recipes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error("Server not found, try again later");
      default:
        throw new Error(`Unknown error: ${response.status}`);
    }
  }
  const data = await response.json();

  return data;
};
