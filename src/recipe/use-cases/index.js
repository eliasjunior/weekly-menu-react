import RecipeGateway from "./RecipeGateway";
import { get, post, put } from "service/RecipeTemporaryAPI";

const {
  getRecipes,
  saveRecipeAsync,
  updateRecipeAsync,
  getRecipeAsync
} = RecipeGateway({ httpAPI: { get, post, put } });

export default {
  getRecipes,
  saveRecipeAsync,
  updateRecipeAsync,
  getRecipeAsync
};
