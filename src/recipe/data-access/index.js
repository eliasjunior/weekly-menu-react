import RecipeDataAPI from "./RecipeDataAPI";
import { get, post, put } from "service/HttpAPI";

const {
  getRecipes,
  saveRecipeAsync,
  updateRecipeAsync,
  getRecipeAsync,
} = RecipeDataAPI({ httpAPI: { get, post, put } });

export default {
  getRecipes,
  saveRecipeAsync,
  updateRecipeAsync,
  getRecipeAsync,
};
