import { loadingSomething } from "./LoadingAction";
import {
  putShoppingList,
  postShoppingList,
  getShoppingHistory,
} from "shopping-list/presenter";
import { afterRequest, afterRequestError } from "./Common";
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
    payload: {cart : shoppingList},
  };
}

export function updateShoppingList(shoppingList) {
  return {
    type: UPDATE_SHOPPING_LIST,
    payload: {cart : shoppingList},
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
      afterRequest(dispatch);
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

      afterRequest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
