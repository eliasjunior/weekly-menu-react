import RecipeUseCase from "../use-cases";

const { getRecipes, updateRecipeAsync, saveRecipeAsync } = RecipeUseCase;

export default {
  getRecipes,
  putRecipe: updateRecipeAsync,
  postRecipe: saveRecipeAsync
};
