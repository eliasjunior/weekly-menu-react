import {
  ADD_SIMPLE_PRODUCT,
  ADD_PRODS_RECIPE,
  EDIT_SHOPPING_LIST,
  CLEAR_SHOPPING_LIST,
} from "app-redux/actions/ShoppingListAction";

import {
  normalizeCatProd,
  normalizeProdRecipe,
  buildFromShopHistory,
} from "shopping-list/presenter";

const initialState = {
  categories: { byId: {} },
  products: { byId: {}, selected: [] },
  recipes: { byId: {} },
};

export default function ShoppingListReducer(
  state = initialState,
  { type, payload }
) {
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
    case EDIT_SHOPPING_LIST:
      const { productMap, shoppingHistory } = payload;

      try {
        const result = buildFromShopHistory({
          productMap,
          shoppingHistory,
        });

        return result;
      } catch (error) {
        console.error(error);
        return state;
      }
    case CLEAR_SHOPPING_LIST: {
      return initialState;
    }
    default:
      return state;
  }
}
