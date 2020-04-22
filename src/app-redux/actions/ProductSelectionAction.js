export const ADD_SELECTED_PROD = "ADD_SELECTED_PROD";
export const ADD_ALL_SELECTED_PROD = "ADD_ALL_SELECTED_PROD";

export function addSelectedProduct(prodId) {
  return {
    type: ADD_SELECTED_PROD,
    payload: { prodId },
  };
}

export function addAllSelectedProduct({ prodIds, toggled }) {
  return {
    type: ADD_ALL_SELECTED_PROD,
    payload: { prodIds, toggled },
  };
}
