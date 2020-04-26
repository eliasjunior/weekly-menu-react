import { requiredParameter } from "common/Util";

export const ADD_SIMPLE_PRODUCT = "ADD_SIMPLE_PRODUCT";
export const ADD_PRODS_RECIPE = "ADD_PRODS_RECIPE";

export function addSimpleProduct({
  prodId = requiredParameter("prodId"),
  catId = requiredParameter("catId "),
}) {
  return {
    type: ADD_SIMPLE_PRODUCT,
    payload: { prodId, catId },
  };
}

export function addProdsRecipe(item) {
  return {
    type: ADD_PRODS_RECIPE,
    payload: { ...item },
  };
}
