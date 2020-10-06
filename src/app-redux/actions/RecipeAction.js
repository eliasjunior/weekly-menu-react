import { requiredParameter, logService } from "common/Util";

export const UPDATE_CURRENT_RECIPE = "UPDATE_CURRENT_RECIPE";
export const UPDATE_CURRENT_REC_NAME = "RECIPE_UPDATE_NAME";

export function updateCurrentRecipe({ name = "", id, prodsDetail = [] } = {}) {
  if (id && !prodsDetail) {
    requiredParameter("prodsDetail");
  }

  if (!Array.isArray(prodsDetail)) {
    logService("prodsDetail has to be an array");
    return;
  }

  return {
    type: UPDATE_CURRENT_RECIPE,
    payload: {
      id,
      name,
      prodsDetail,
    },
  };
}

// DO not use only the above I want just update the name
export function updateCurrentRecipeName({ name = "" }) {
  return {
    type: UPDATE_CURRENT_REC_NAME,
    payload: {
      name,
    },
  };
}
