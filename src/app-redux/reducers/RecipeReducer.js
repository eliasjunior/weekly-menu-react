import {
  UPDATE_CURRENT_RECIPE,
  UPDATE_CURRENT_REC_NAME,
} from "app-redux/actions/RecipeAction";

const initialState = { name: "", id: null };

export default function RecipeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_CURRENT_RECIPE:
      return {
        name: payload.name,
        id: payload.id,
        prodsDetail: payload.prodsDetail,
      };
    case UPDATE_CURRENT_REC_NAME:
      return { ...state, name: payload.name };
    default:
      return state;
  }
}
