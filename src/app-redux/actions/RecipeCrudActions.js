import { loadingSomething } from "./LoadingAction";
import { afterRequest, afterRequestError } from "./Common";
import Presenter from "recipe/presenter";
import { updateCurrentRecipe } from "./RecipeAction";
import { setPageTitle } from "./PageAction";
export const RECIPE_CREATE = "RECIPE_CREATE";
export const RECIPE_UPDATE = "RECIPE_UPDATE";
export const FETCH_RECIPES = "FETCH_RECIPES";
const { postRecipe, getRecipes, putRecipe } = Presenter;

//TODO test redux here { recipe = requiredParameter("recipe"), products }
function createRecipe({ id, name, prodsDetail }) {
  return {
    type: RECIPE_CREATE,
    payload: {
      name,
      id,
      prodsDetail,
    },
  };
}

function updateRecipe({ id, name, prodsDetail }) {
  return {
    type: RECIPE_UPDATE,
    payload: {
      name,
      id,
      prodsDetail,
    },
  };
}

export function createRecipeAsync(recipe) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await postRecipe(recipe);
      recipe.id = data.id;
      dispatch(createRecipe(data));
      dispatch(updateCurrentRecipe(data));
      dispatch(setPageTitle("Update Recipe"));
      afterRequest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function updateRecipeAsync(recipe) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      await putRecipe(recipe);
      dispatch(updateRecipe(recipe));
      dispatch(updateCurrentRecipe(recipe));

      afterRequest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function fetchRecipes(recipes) {
  return {
    type: FETCH_RECIPES,
    payload: { recipes },
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
