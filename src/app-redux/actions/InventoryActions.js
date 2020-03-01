import Presenter from "inventory/presenter";

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
  return async dispatch => {
    dispatch(pendingRequest());
    try {
      const data = await getCategories();
      dispatch(fetchCategory(data));
    } catch (error) {
      return dispatch(erroFecth(error));
    }
  };
}

export function updateCategoryAsync(category) {
  return async dispatch => {
    dispatch(pendingRequest());
    try {
      const data = await putAction(category);
      return dispatch(updateCategory(data));
    } catch (error) {
      return dispatch(erroFecth(error));
    }
  };
}
