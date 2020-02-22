import { UPDATE_CAT } from "../actions/inventoryActions";

export const initialState = {
  categories: []
};

export default function InventoryReducer(state = initialState, action) {
  const { type, category } = action;
  switch (type) {
    case UPDATE_CAT:
      return {
        ...state,
        categories: state.categories.reduce((acc, item) => {
          if (item._id === category._id) {
            item = category;
          }
          acc.push(item);
          return acc;
        }, [])
      };
    default:
      return state;
  }
}
