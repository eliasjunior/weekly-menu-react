import Presenter from "inventory/presenter";
import { loadingSomething } from "./LoadingAction";
import { afterRequest, afterRequestError } from "./Common";
import { requiredParameter } from "common/Util";
const { getCategories, putCategory, postCategory } = Presenter;

export const UPDATE_CAT = "UPDATE_CAT";
export const FETCH_CATS = "FETCH_CATS";
export const CREATE_CAT = "CREATE_CAT";

export const ERROR_REQUEST = "ERROR_REQUEST";

export function updateCategory(category) {
  return {
    type: UPDATE_CAT,
    payload: { category },
  };
}

export function createCategory(category) {
  return {
    type: CREATE_CAT,
    payload: { category },
  };
}

export function fetchCategory(categories) {
  return {
    type: FETCH_CATS,
    payload: { categories },
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
      afterRequest(dispatch);
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
      afterRequest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
