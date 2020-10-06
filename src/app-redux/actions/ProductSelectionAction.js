export const ADD_SELECTED_PROD = "ADD_SELECTED_PROD";
export const ADD_ALL_SELECTED_PROD = "ADD_ALL_SELECTED_PROD";
export const RESET_SELECTED_PROD = "RESET_SELECTED_PROD";

export function addSelectedProduct(prodId) {
  return {
    type: ADD_SELECTED_PROD,
    payload: { prodId },
  };
}

export function addAllSelectedProduct({ prodIds, toggled, reset = false }) {
  return {
    type: ADD_ALL_SELECTED_PROD,
    payload: { prodIds, toggled, reset },
  };
}

export function resetSelectedProduct() {
  return {
    type: RESET_SELECTED_PROD,
  };
}
