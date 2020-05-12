import {
  ADD_SIMPLE_PRODUCT,
  ADD_PRODS_RECIPE,
} from "app-redux/actions/ShoppingListAction";

import { normalizeCatProd, normalizeProdRecipe } from "shopping-list/presenter";

const initialState = {
  categories: { byId: {} },
  products: { byId: {}, selected: [] },
  recipes: { byId: {} },
};

export default function ShoppingListReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SIMPLE_PRODUCT:
      const { catId, prodId } = payload;
      return normalizeCatProd({
        state,
        catId,
        prodId,
        checked: payload.checked,
      });
    case ADD_PRODS_RECIPE:
      const { recId, prods } = payload;

      return prods.reduce((prev, { id, catId }) => {
        prev = normalizeProdRecipe({
          state: prev,
          recId,
          catId,
          prodId: id,
          checked: payload.checked,
        });
        return prev;
      }, state);

    default:
      return state;
  }
}
