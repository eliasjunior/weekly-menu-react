import { loadingSomething } from "./LoadingAction";
import { afterResquest, afterRequestError } from "./common";
import Presenter from "recipe/presenter";
import { recipeUpdateId, recipeUpdateCurrent } from "./RecipeAction";
export const RECIPE_CREATE = "RECIPE_CREATE";
export const RECIPE_UPDATE = "RECIPE_UPDATE";
export const FETCH_RECIPES = "FETCH_RECIPES";
const { postRecipe, getRecipes, putRecipe } = Presenter;

//TODO test redux here { recipe = requiredParameter("recipe"), products }
function createRecipe({ id, name, products }) {
  return {
    type: RECIPE_CREATE,
    payload: {
      name,
      id,
      products,
    },
  };
}

function updateRecipe({ id, name, products }) {
  return {
    type: RECIPE_UPDATE,
    payload: {
      name,
      id,
      products,
    },
  };
}

export function createRecipeAsync(recipe) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await postRecipe(recipe);

      dispatch(createRecipe(data));
      dispatch(recipeUpdateId({ id: data.id }));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function updateRecipeAsync(recipe) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await putRecipe(recipe);
      //TODO review update list and current
      dispatch(updateRecipe(recipe));
      dispatch(recipeUpdateCurrent(recipe));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function fetchRecipes(data) {
  return {
    type: FETCH_RECIPES,
    recipes: data,
  };
}
export function fetchRecipesAsync() {
  return async (dispatch) => {
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
