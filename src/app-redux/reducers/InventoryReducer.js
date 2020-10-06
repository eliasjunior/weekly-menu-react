import {
  UPDATE_CAT,
  FETCH_CATS,
  CREATE_CAT,
} from "../actions/InventoryActions";

export default function InventoryReducer(state = [], { type, payload = {} }) {
  const { category, categories } = payload;
  switch (type) {
    case UPDATE_CAT:
      return state.reduce((acc, item) => {
        if (item.id === category.id) {
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
