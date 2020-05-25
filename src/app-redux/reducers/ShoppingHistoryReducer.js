import {
  CREATE_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST,
  FETCH_SHOPPING_HISTORY,
} from "app-redux/actions/ShoppingHistoryAction";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SHOPPING_LIST:
      return [...state, payload];
    case UPDATE_SHOPPING_LIST:
      return [...state, payload];
    case FETCH_SHOPPING_HISTORY:
      return [...payload.shoppingHistory];
    default:
      return state;
  }
};
