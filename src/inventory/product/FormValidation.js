import { infoMessage } from "app-redux/actions/AlertHandlerAction";
export function isProdFormValid({ name, dispatch, quantityType }) {
  if (!name) {
    dispatch(infoMessage("Product name is required."));
    return false;
  }
  if (!quantityType) {
    dispatch(infoMessage("Quantity type is required."));
    return false;
  }
  return true;
}
