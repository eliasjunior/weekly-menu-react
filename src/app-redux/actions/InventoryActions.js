import Presenter from "inventory/presenter";
import { loadingSomething } from "./LoadingAction";
import { afterResquest, afterRequestError } from "./common";
import { requiredParameter } from "common/Util";
const { getCategories, putCategory, postCategory } = Presenter;

export const UPDATE_CAT = "UPDATE_CAT";
export const FETCH_CATS = "FETCH_CATS";
export const CREATE_CAT = "CREATE_CAT";

export const ERROR_REQUEST = "ERROR_REQUEST";

export function updateCategory(category) {
  return {
    type: UPDATE_CAT,
    category,
  };
}

export function createCategory(category) {
  return {
    type: CREATE_CAT,
    category,
  };
}

export function fetchCategory(data) {
  return {
    type: FETCH_CATS,
    categories: data,
  };
}

export function fetchCategoryAsync() {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await getCategories();
      dispatch(fetchCategory(data));
      dispatch(loadingSomething(false));
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function updateCategoryAsync(category = requiredParameter("category")) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      await putCategory(category);
      dispatch(updateCategory(category));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function createCategoryAsync(category) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await postCategory(category);
      dispatch(createCategory(data));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
