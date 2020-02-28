export const SET_FILTER_NAME = "SET_FILTER_NAME";

export function inventoryFilter(textFilter) {
  return {
    type: SET_FILTER_NAME,
    textFilter
  };
}
