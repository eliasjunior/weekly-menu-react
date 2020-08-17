import {
  RECIPE_CREATE,
  FETCH_RECIPES,
  RECIPE_UPDATE,
} from "app-redux/actions/RecipeCrudActions";

const initialState = {};

export default function RecipesReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case RECIPE_CREATE:
      state.byId[payload.id] = payload;
      state.allIds.push(payload.id);
      return state;
    case RECIPE_UPDATE:
      state.byId[payload.id] = payload;
      return state;
    case FETCH_RECIPES:
      return { ...payload.recipes };
    default:
      return state;
  }
}
