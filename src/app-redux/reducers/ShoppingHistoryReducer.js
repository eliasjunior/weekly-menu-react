import {
  CREATE_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST,
  FETCH_SHOPPING_HISTORY,
} from "app-redux/actions/ShoppingHistoryAction";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SHOPPING_LIST:
      return [...state, payload.cart];
    case UPDATE_SHOPPING_LIST:
      return state.reduce((acc, item) => {
        if (item.id === payload.cart.id) {
          item = payload.cart;
        }
        acc.push(item);
        return acc;
      }, []);
    case FETCH_SHOPPING_HISTORY:
      return [...payload.shoppingHistory];
    default:
      return state;
  }
};
