import RecipeUseCase from "../data-access";

const { getRecipes, updateRecipeAsync, saveRecipeAsync } = RecipeUseCase;

export default {
  getRecipes,
  putRecipe: updateRecipeAsync,
  postRecipe: saveRecipeAsync,
};
