import {
  RECIPE_CREATE,
  FETCH_RECIPES,
  RECIPE_UPDATE,
} from "app-redux/actions/RecipeCrudActions";
import { sanitizeRecipe } from "recipe/helpers/RecipeHelper";

const initialState = {};

export default function RecipesReducer(
  state = initialState,
  { type, payload }
) {
  const { byId = {}, allIds = [] } = state;
  switch (type) {
    case RECIPE_CREATE:
      sanitizeRecipe({ recipe: payload });
      byId[payload.id] = payload;
      allIds.push(payload.id);
      return { byId, allIds };
    case RECIPE_UPDATE:
      sanitizeRecipe({ recipe: payload });
      byId[payload.id] = payload;
      return { ...state, byId, allIds };
    case FETCH_RECIPES:
      return { ...payload.recipes };
    default:
      return state;
  }
}
