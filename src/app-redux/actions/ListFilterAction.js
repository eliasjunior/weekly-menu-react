export const SET_FILTER_NAME = "SET_FILTER_NAME";

export function listFilterAction(textFilter, listDB) {
  return {
    type: SET_FILTER_NAME,
    textFilter,
    listDB
  };
}
