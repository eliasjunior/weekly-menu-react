import {
  ADD_SIMPLE_PRODUCT,
  ADD_PRODS_RECIPE,
  LOAD_CART_SELECTED,
  CLEAR_SHOPPING_LIST, CLONE_CART,
} from "app-redux/actions/CartAction";

import {
  normalizeCatProd,
  normalizeProdRecipe,
  buildFromShopHistory, getTimeAPI,
} from "shopping-list/presenter";

const initialState = {
  categories: { byId: {} },
  products: { byId: {}, selected: [] },
  recipes: { byId: {} },
};

export default function CartReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_SIMPLE_PRODUCT:
      const { catId, prodId } = payload;
      const shopWithNewProd = normalizeCatProd({
        state,
        catId,
        prodId,
        checked: payload.checked,
      });
      shopWithNewProd.id = state.id;
      shopWithNewProd.name = state.name;
      return shopWithNewProd;
    case ADD_PRODS_RECIPE:
      const { recId, prods } = payload;
      const shopWithNewRecipe = prods.reduce((prev, { id, catId }) => {
        prev = normalizeProdRecipe({
          state: prev,
          recId,
          catId,
          prodId: id,
          checked: payload.checked,
        });
        return prev;
      }, state);
      shopWithNewRecipe.id = state.id;
      shopWithNewRecipe.name = state.name;
      return shopWithNewRecipe;
    case LOAD_CART_SELECTED:
      const { productMap, shoppingHistory } = payload;
      try {
        const cart = buildFromShopHistory({
          productMap,
          shoppingHistory,
        });
        return cart;
      } catch (error) {
        console.error(error);
        return state;
      }
    case CLONE_CART:
      const byId = state.products.byId;
      const allIds = state.products.selected;
      console.log("byId", byId)
      state.name = getTimeAPI().getTimeLabel();
      state.id = undefined;
      // selected its just like allIds
      const byIdNew = allIds.reduce((acc, id)=> {
        const cartItem = byId[id]
        cartItem.itemIdOfCart = undefined
        acc[id] = cartItem;
        return acc;
      }, {})
      state.products.byId = byIdNew;
      return {...state};
    case CLEAR_SHOPPING_LIST: {
      return initialState;
    }
    default:
      return state;
  }
}
