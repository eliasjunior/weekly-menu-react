import { loadingSomething } from "./LoadingAction";
import { afterResquest, afterRequestError } from "./common";
import Presenter from "recipe/presenter";

export const RECIPE_CHECK_CLICK = "RECIPE_CHECK_CLICK";
export const RECIPE_CHECK_ALL_CLICK = "RECIPE_CHECK_ALL_CLICK";
export const RECIPE_CREATE = "RECIPE_CREATE";

const { postRecipe } = Presenter;

export function recipeClickAction({ prodId, name }) {
  return {
    type: RECIPE_CHECK_CLICK,
    payload: {
      prodId,
      name
    }
  };
}

export function recipeClickAllAction({ checkedAll, products }) {
  return {
    type: RECIPE_CHECK_ALL_CLICK,
    payload: {
      checked: checkedAll,
      allProds: products
    }
  };
}

function createRecipe({ recipe, products }) {
  return {
    type: RECIPE_CREATE,
    payload: {
      recipe,
      products
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
