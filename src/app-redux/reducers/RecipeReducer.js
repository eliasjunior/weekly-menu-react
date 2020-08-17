import { LOAD_RECIPE_SELECTED } from "app-redux/actions/RecipeAction";

const initialState = { name: "", id: null };

export default function RecipeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_RECIPE_SELECTED:
      return {
        name: payload.name,
        id: payload.id,
        products: payload.products,
        prodsDetail: payload.prodsDetail,
      };
    default:
      return state;
  }
}
