export const RECIPE_CHECK_CLICK = "RECIPE_CHECK_CLICK";
export const RECIPE_CHECK_ALL_CLICK = "RECIPE_CHECK_ALL_CLICK";
export const RECIPE_UPDATE_CURRENT = "RECIPE_UPDATE_CURRENT";
export const RECIPE_UPDATE_NAME = "RECIPE_UPDATE_NAME";

//TODO review this action and reducer just being subscribed at one place ??

export function recipeUpdateName({ name }) {
  return {
    type: RECIPE_UPDATE_NAME,
    payload: {
      name,
    },
  };
}

export function recipeUpdateCurrent({ name = "", id, products } = {}) {
  return {
    type: RECIPE_UPDATE_CURRENT,
    payload: {
      id,
      name,
      products,
    },
  };
}
