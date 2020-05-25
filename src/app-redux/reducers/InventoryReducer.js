import {
  UPDATE_CAT,
  FETCH_CATS,
  CREATE_CAT,
} from "../actions/InventoryActions";

//TODO the name starts to make no sence after create Products onw reducer
export default function InventoryReducer(state = [], action) {
  const { type, category, categories } = action;
  switch (type) {
    case UPDATE_CAT:
      return state.reduce((acc, item) => {
        if (item.id === category.id) {
          console.log("category to be update", item);
          item = category;
        }
        acc.push(item);
        return acc;
      }, []);
    case CREATE_CAT:
      return [...state, category];
    case FETCH_CATS:
      return [...categories];
    default:
      return state;
  }
}

//TODO have a look to create selectors with HOOKS
//export const getCategories = state => state.categories;
