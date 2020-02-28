import Presenter from "../../inventory/presenter";

const { getCategories, putAction } = Presenter;

export const UPDATE_CAT = "UPDATE_CAT";
export const FETCH_CATS = "FETCH_CATS";
export const PENDING_FETCH = "LOADING";
export const ADD_CAT = "ADD_CAT";
export const ERROR_REQUEST = "ERROR_REQUEST";

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

function pendingRequest() {
  return {
    type: PENDING_FETCH
  };
}

function erroFecth(error) {
  return {
    type: ERROR_REQUEST,
    error
  };
}

export function fetchCategoryAsync() {
  return dispatch => {
    dispatch(pendingRequest());
    return getCategories()
      .then(data => {
        dispatch(fetchCategory(data));
      })
      .catch(error => dispatch(erroFecth(error)));
  };
}

export function updateCategoryAsync(category) {
  return dispatch => {
    dispatch(pendingRequest());
    return putAction(category)
      .then(data => dispatch(updateCategory(data)))
      .catch(error => dispatch(erroFecth(error)));
  };
}
