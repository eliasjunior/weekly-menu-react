import { loadingSomething } from "./LoadingAction";
import {
  putShoppingList,
  postShoppingList,
  getShoppingHistory,
} from "shopping-list/presenter";
import { afterResquest, afterRequestError } from "./common";
import { requiredParameter } from "common/Util";
export const UPDATE_SHOPPING_LIST = "UPDATE_SHOPPING_LIST";
export const CREATE_SHOPPING_LIST = "CREATE_SHOPPING_LIST";
export const FETCH_SHOPPING_HISTORY = "FETCH_SHOPPING_HISTORY";

export function fetchShoppingHistory(shoppingHistory = []) {
  return {
    type: FETCH_SHOPPING_HISTORY,
    payload: {
      shoppingHistory,
    },
  };
}

export function createShoppingList(shoppingList) {
  return {
    type: CREATE_SHOPPING_LIST,
    payload: shoppingList,
  };
}

export function updateShoppingList(shoppingList) {
  return {
    type: UPDATE_SHOPPING_LIST,
    payload: shoppingList,
  };
}

export function fetchShoppingHistoryAsync() {
  return async (dispatch) => {
    try {
      const data = await getShoppingHistory();
      dispatch(fetchShoppingHistory(data));
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function updateShoppingListAsync(
  shoppingList = requiredParameter("shoppingList")
) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      await putShoppingList(shoppingList);
      dispatch(updateShoppingList(shoppingList));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
export function createShoppingListAsync(shoppingList) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await postShoppingList(shoppingList);
      shoppingList.id = data.id;
      dispatch(createShoppingList(data));

      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
