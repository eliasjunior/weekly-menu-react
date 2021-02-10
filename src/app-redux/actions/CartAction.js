import { requiredParameter } from "common/Util";

export const ADD_SIMPLE_PRODUCT = "ADD_SIMPLE_PRODUCT";
export const ADD_PRODS_RECIPE = "ADD_PRODS_RECIPE";
export const LOAD_CART_SELECTED = "LOAD_CART_SELECTED";
export const CLONE_CART = "CLONE_CART";
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

export function addProdsRecipe({
  recId = requiredParameter("Recipe id"),
  prods = requiredParameter("ProdDetails"),
  checked = requiredParameter("checked"),
}) {
  return {
    type: ADD_PRODS_RECIPE,
    payload: { recId, prods, checked },
  };
}

export function editCartAction(item, productMap) {
  return {
    type: LOAD_CART_SELECTED,
    payload: { shoppingHistory: item, productMap },
  };
}

export function cloneCartAction({name, id}) {
  return {
    type: CLONE_CART,
    payload: { cart: {name, id} },
  };
}

export function clearCartAction() {
  return {
    type: CLEAR_SHOPPING_LIST,
  };
}
