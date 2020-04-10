import { loadingSomething } from "./LoadingAction";
import { afterResquest, afterRequestError } from "./common";
import Presenter from "recipe/presenter";
import { recipeUpdateId, recipeUpdateCurrent } from "./RecipeAction";
import { setPageTitle } from "./PageAction";
export const RECIPE_CREATE = "RECIPE_CREATE";
export const RECIPE_UPDATE = "RECIPE_UPDATE";
export const FETCH_RECIPES = "FETCH_RECIPES";
const { postRecipe, getRecipes, putRecipe } = Presenter;

//TODO test redux here { recipe = requiredParameter("recipe"), products }
function createRecipe({ id, name }) {
  return {
    type: RECIPE_CREATE,
    payload: {
      name,
      id,
    },
  };
}

function updateRecipe({ id, name }) {
  return {
    type: RECIPE_UPDATE,
    payload: {
      name,
      id,
    },
  };
}

export function createRecipeAsync(recipe) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      recipe.recProds = recipe.products.map((prod) => prod.id);
      const data = await postRecipe(recipe);
      recipe.id = data.id;
      dispatch(createRecipe(data));
      dispatch(recipeUpdateCurrent(recipe));
      dispatch(setPageTitle("Update Recipe"));
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
      recipe.recProds = recipe.products.map((prod) => prod.id);
      await putRecipe(recipe);
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
