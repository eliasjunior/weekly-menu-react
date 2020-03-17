import { UPDATE_CAT, FETCH_CATS } from "../actions/InventoryActions";

export default function InventoryReducer(state = [], action) {
  const { type, category, categories } = action;
  switch (type) {
    case UPDATE_CAT:
      return state.reduce((acc, item) => {
        if (item._id === category._id) {
          item = category;
        }
        acc.push(item);
        return acc;
      }, []);
    case FETCH_CATS:
      return [...categories];
    default:
      return state;
  }
}

// selectors
//export const getCategories = state => state.categories;
