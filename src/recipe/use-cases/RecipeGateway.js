import {
  recipeConverter,
  recipeListMapper,
  recipeMapper,
} from "./RecipeMapper";

export default function RecipeGateway({ httpAPI }) {
  return {
    getRecipes: async () => {
      try {
        const data = await httpAPI.get("recipes");
        return recipeListMapper(data);
      } catch (error) {
        throw error;
      }
    },
    saveRecipeAsync: async (recipe) => {
      try {
        const data = await httpAPI.post(
          "recipes",
          recipeConverter(recipe, true)
        );
        return recipeMapper(data);
      } catch (error) {
        throw error;
      }
    },
    updateRecipeAsync: async (recipe) => {
      try {
        const data = await httpAPI.put(
          "recipes/" + recipe.id,
          recipeConverter(recipe)
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    getRecipeAsync: async (id) => {
      try {
        const data = await httpAPI.get("recipes/" + id);
        return recipeMapper(data);
      } catch (error) {
        throw error;
      }
    },
  };
}
