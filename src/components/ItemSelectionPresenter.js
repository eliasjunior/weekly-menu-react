import { addSelectedProduct } from "app-redux/actions/ProductSelectionAction";

export function getChecked(ids, currentId) {
  return ids.filter((id) => id === currentId).length > 0;
}
export function handleOnChange({ dispatch, prodId }) {
  //dispatch(recipeClickAction({ product }));
  // is sending undefined
  dispatch(addSelectedProduct(prodId));
}
