import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "app-redux/actions/ProductAction";
import { normalize } from "common/Util";

const initialState = {};
export default function productsReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      // return normalize(payload.products);
      return { ...payload.products };
    case CREATE_PRODUCT:
      const newProduct = payload.product;
      state.byId[newProduct.id] = newProduct;
      state.allIds.push(newProduct.id);
      return state;

    case UPDATE_PRODUCT:
      const updateProd = payload.product;
      state.byId[updateProd.id] = updateProd;
      return state;

    default:
      return state;
  }
}
