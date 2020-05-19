import { requiredParameter } from "common/Util";

export const ADD_SIMPLE_PRODUCT = "ADD_SIMPLE_PRODUCT";
export const ADD_PRODS_RECIPE = "ADD_PRODS_RECIPE";
export const EDIT_SHOPPING_LIST = "EDIT_SHOPPING_LIST";
export const CLEAR_SHOPPING_LIST = "CLEAR_SHOPPING_LIST";

export function addSimpleProduct({
  prodId = requiredParameter("prodId"),
  catId = requiredParameter("catId"),
  checked = requiredParameter("checked"),
}) {
  return {
    type: ADD_SIMPLE_PRODUCT,
    payload: { prodId, catId, checked },
  };
}

export function addProdsRecipe(item) {
  return {
    type: ADD_PRODS_RECIPE,
    payload: { ...item },
  };
}

export function editShoppingListAction(item, productMap) {
  return {
    type: EDIT_SHOPPING_LIST,
    payload: { shoppingHistory: item, productMap },
  };
}

export function clearShoppingListAction() {
  return {
    type: CLEAR_SHOPPING_LIST,
  };
}
