import {
  ADD_SELECTED_PROD,
  ADD_ALL_SELECTED_PROD,
} from "app-redux/actions/ProductSelectionAction";
import { requiredParameter } from "common/Util";

const initialState = [];

export default function ShopptingListReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SELECTED_PROD:
      const { prodId = requiredParameter("prodId") } = payload;
      const originalLength = state.length;
      const filteredIds = state.filter((id) => id !== prodId);
      if (originalLength === filteredIds.length) {
        filteredIds.push(prodId);
      }
      return [...filteredIds];
    case ADD_ALL_SELECTED_PROD:
      const { prodIds = requiredParameter("allProds"), toggled } = payload;
      if (toggled) {
        return [...state, ...prodIds];
      } else {
        return state.reduce((prev, id) => {
          if (!prodIds.includes(id)) {
            prev.push(id);
          }
          return prev;
        }, []);
      }
    default:
      return state;
  }
}
