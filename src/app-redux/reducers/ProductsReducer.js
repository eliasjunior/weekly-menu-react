import { FETCH_PRODUCTS } from "app-redux/actions/ProductAction";
import { normalize } from "common/Util";

const initialState = {};
export default function productsReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return normalize(payload.products);
    default:
      return state;
  }
}
