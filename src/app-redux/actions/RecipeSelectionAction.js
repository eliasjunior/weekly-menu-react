export const ADD_SELECTED_RECIPE = "ADD_SELECTED_RECIPE";

export function recipeSelectionAction(recId) {
  return {
    type: ADD_SELECTED_RECIPE,
    payload: {
      recId,
    },
  };
}
