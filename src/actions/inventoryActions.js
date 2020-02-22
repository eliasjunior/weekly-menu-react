export const UPDATE_CAT = "UPDATE_CAT";
export const FETCH_CATS = "FETCH_CATS";

export function updateCategory(category) {
  return {
    type: UPDATE_CAT,
    category
  };
}

export function fetchCategory(data) {
  return {
    type: FETCH_CATS,
    categories: data
  };
}
