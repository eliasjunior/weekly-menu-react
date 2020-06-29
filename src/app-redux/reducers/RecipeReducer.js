import {
  RECIPE_UPDATE_CURRENT,
  RECIPE_UPDATE_NAME,
} from "app-redux/actions/RecipeAction";

const initialState = { name: "", id: null };

export default function RecipeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case RECIPE_UPDATE_CURRENT:
      return {
        name: payload.name,
        id: payload.id,
        products: payload.products,
      };
    case RECIPE_UPDATE_NAME:
      return {
        ...state,
        name: payload.name,
      };
    default:
      return state;
  }
}
