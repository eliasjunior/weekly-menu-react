import Presenter from "inventory/presenter";
import { httpError } from "./ErrorHandlerAction";
import { successMessage } from "./AlertHandlerAction";
import { loadingSomething } from "./LoadingAction";

const { getCategories, putAction, postActionProduct } = Presenter;

export const UPDATE_CAT = "UPDATE_CAT";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const FETCH_CATS = "FETCH_CATS";
export const ADD_CAT = "ADD_CAT";
export const ERROR_REQUEST = "ERROR_REQUEST";

export function updateCategory(category) {
  return {
    type: UPDATE_CAT,
    category
  };
}

export function saveProduct(product) {
  return {
    type: SAVE_PRODUCT,
    product
  };
}

export function fetchCategory(data) {
  return {
    type: FETCH_CATS,
    categories: data
  };
}

export function fetchCategoryAsync() {
  return async dispatch => {
    dispatch(loadingSomething(true));
    try {
      const data = await getCategories();
      dispatch(fetchCategory(data));
      dispatch(loadingSomething(false));
    } catch (error) {
      dispatch(httpError(error));
      dispatch(loadingSomething(false));
    }
  };
}

export function updateCategoryAsync(category) {
  return async dispatch => {
    dispatch(loadingSomething(true));
    try {
      const data = await putAction(category);
      dispatch(updateCategory(data));
      dispatch(successMessage());
      dispatch(loadingSomething(false));
    } catch (error) {
      dispatch(httpError(error));
      dispatch(loadingSomething(false));
    }
  };
}

export function saveProductAsync(category) {
  return async dispatch => {
    dispatch(loadingSomething(true));
    try {
      const data = await postActionProduct(category);
      dispatch(saveProduct(data));
      dispatch(successMessage());
      dispatch(loadingSomething(false));
    } catch (error) {
      dispatch(httpError(error));
      dispatch(loadingSomething(false));
    }
  };
}
