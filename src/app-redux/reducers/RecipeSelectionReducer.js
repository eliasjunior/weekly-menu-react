import { ADD_SELECTED_RECIPE } from "app-redux/actions/RecipeSelectionAction";

const initialState = [];

export default function RecipesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SELECTED_RECIPE:
      const { recId } = payload;
      const originalLength = state.length;
      const filteredIds = state.filter((id) => id !== recId);
      if (originalLength === filteredIds.length) {
        filteredIds.push(recId);
      }
      return [...filteredIds];
    default:
      return state;
  }
}
