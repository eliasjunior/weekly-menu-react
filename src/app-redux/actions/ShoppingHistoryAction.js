import { loadingSomething } from "./LoadingAction";
import { putShoppingList, postShoppingList } from "shopping-list/presenter";
import { afterResquest, afterRequestError } from "./common";
import { requiredParameter } from "common/Util";
export const UPDATE_SHOPPING_LIST = "UPDATE_SHOPPING_LIST";
export const CREATE_SHOPPING_LIST = "CREATE_SHOPPING_LIST";

// // not sure will be here
// export function fetchShoppingList(list) {
//   return {
//     type: FETCH_SHOPPING_HISTORY,
//     payload: {
//       list,
//     },
//   };
// }

export function createShoppingList(shopping) {
  return {
    type: CREATE_SHOPPING_LIST,
    payload: shopping,
  };
}

export function updateShoppingList(shoppingListId) {
  return {
    type: UPDATE_SHOPPING_LIST,
    payload: { shoppingListId },
  };
}

export function updateShoppingListAsync(
  shoppingList = requiredParameter("shoppingList")
) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await putShoppingList(shoppingList);
      dispatch(updateShoppingList(data));
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
      dispatch(createShoppingList(shoppingList));

      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
