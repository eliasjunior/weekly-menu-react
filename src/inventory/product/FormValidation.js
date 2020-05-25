import { infoMessage } from "app-redux/actions/AlertHandlerAction";
export function isProdFormValid({ name, dispatch }) {
  if (!name) {
    dispatch(infoMessage("You cannot save a product without a name!"));
    return false;
  }
  return true;
}
