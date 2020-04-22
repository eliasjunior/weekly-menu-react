import { infoMessage } from "app-redux/actions/AlertHandlerAction";
export function isRecipeFormValid({ name, dispatch, selectedProducts = [] }) {
  if (selectedProducts.length === 0) {
    dispatch(infoMessage("oops you have to check at least one product"));
    return false;
  }
  if (!name) {
    dispatch(infoMessage("You cannot save a recipe without a name!"));
    return false;
  }
  return true;
}
