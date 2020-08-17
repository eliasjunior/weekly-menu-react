import { requiredParameter, logService } from "common/Util";

export const RECIPE_CHECK_CLICK = "RECIPE_CHECK_CLICK";
export const RECIPE_CHECK_ALL_CLICK = "RECIPE_CHECK_ALL_CLICK";
export const LOAD_RECIPE_SELECTED = "LOAD_RECIPE_SELECTED";
export const RECIPE_UPDATE_NAME = "RECIPE_UPDATE_NAME";

export function UpdateCurrentRecipe({
  name = "",
  id,
  products = [],
  prodsDetail = requiredParameter("prodsDetail"),
} = {}) {
  if (!Array.isArray(prodsDetail)) {
    logService("prodsDetail has to be an array");
    return;
  }
  if (!Array.isArray(products)) {
    logService("products has to be an array");
    return;
  }

  return {
    type: LOAD_RECIPE_SELECTED,
    payload: {
      id,
      name,
      products,
      prodsDetail,
    },
  };
}
