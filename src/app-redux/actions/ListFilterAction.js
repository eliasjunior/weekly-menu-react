export const SET_FILTER_NAME = "SET_FILTER_NAME";
export const SET_DISPLAY_LIST = "SET_DISPLAY_LIST";

export function listFilterAction(textFilter, listDB) {
  return {
    type: SET_FILTER_NAME,
    textFilter,
    listDB
  };
}

export function setDisplatList(listDB) {
  return {
    type: SET_DISPLAY_LIST,
    listDB
  };
}
