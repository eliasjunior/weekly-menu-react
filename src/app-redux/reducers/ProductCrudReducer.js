import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "app-redux/actions/ProductCrudAction";
import { getQdyDefault } from "inventory/helpers/InventoryHelper";

const initialState = { byId: {}, allIds: [] };
export default function ProductReducer(state = initialState, action) {
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
      updateProd.quantityDefault = getQdyDefault(updateProd.quantityType);
      state.byId[updateProd.id] = updateProd;
      return { ...state };
    default:
      return state;
  }
}
