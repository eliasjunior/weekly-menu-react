export const SET_FILTER_NAME = "SET_FILTER_NAME";
export const SET_DISPLAY_LIST = "SET_DISPLAY_LIST";
export const FLAG_PICKED_SHOP_PROD = "FLAG_PICKED_SHOP_PROD";

export function listFilterAction(textFilter, listDB) {
  return {
    type: SET_FILTER_NAME,
    payload: { listDB, textFilter },
  };
}

export function setDisplatList(listDB) {
  return {
    type: SET_DISPLAY_LIST,
    payload: { listDB },
  };
}

export function flagPickedShotProd({ id, picked }) {
  return {
    type: FLAG_PICKED_SHOP_PROD,
    payload: { id, picked },
  };
}
