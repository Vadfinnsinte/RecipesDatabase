const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const deleteRecipeIngIns = async (id) => {
  const response = await fetch(`${ConnectionString}/Recipes/${id}`, {
    method: "DELETE",
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
