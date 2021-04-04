import {
  recipeConverter,
  recipeListMapper,
  recipeMapper,
} from "./RecipeMapper";

export default function RecipeDataAPI({ httpAPI }) {
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
        await httpAPI.put("recipes", recipeConverter(recipe));
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
