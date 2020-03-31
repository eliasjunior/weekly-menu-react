import { loadingSomething } from "./LoadingAction";
import { afterResquest, afterRequestError } from "./common";
import Presenter from "recipe/presenter";
export const RECIPE_CREATE = "RECIPE_CREATE";
export const FETCH_RECIPES = "FETCH_RECIPES";
const { postRecipe, getRecipes } = Presenter;

//TODO test redux here { recipe = requiredParameter("recipe"), products }
function createRecipe(data) {
  return {
    type: RECIPE_CREATE,
    payload: {
      name: data.name,
      id: data.id,
      products: data.products
    }
  };
}

export function createRecipeAsync(recipe) {
  return async dispatch => {
    dispatch(loadingSomething(true));
    try {
      const data = await postRecipe(recipe);
      dispatch(createRecipe(data));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
export function fetchRecipes(data) {
  return {
    type: FETCH_RECIPES,
    recipes: data
  };
}
export function fetchRecipesAsync() {
  return async dispatch => {
    dispatch(loadingSomething(true));
    try {
      const data = await getRecipes();
      dispatch(fetchRecipes(data));
      dispatch(loadingSomething(false));
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
