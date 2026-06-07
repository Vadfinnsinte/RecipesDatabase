import { createHashRouter } from "react-router-dom";
import App from "../App";
import Recipes from "../components/Recipes";
import HomePage from "../components/HomePage";
import Recipe from "../components/Recipe";
import AddRecipe from "../components/AddRecipe";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/add-recipe",
        element: <AddRecipe />,
      },
    ],
  },
]);
export { router };
