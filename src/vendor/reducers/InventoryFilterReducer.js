import { SET_FILTER_NAME } from "../actions/InventoryFilterAction";
import CloneDeep from "lodash.clonedeep";

export default function InventoryFilterReducer(state = [], action) {
  const { type, textFilter, categories } = action;
  switch (type) {
    case SET_FILTER_NAME:
      const tempCats = CloneDeep(categories);
      return {
        catsFilter: tempCats.filter(cat => {
          cat.products = cat.products.filter(prod => {
            return compareIgnoreCase(prod.name, textFilter);
          });
          return cat.products.length > 0;
        })
      };
    default:
      return state;
  }
}

function compareIgnoreCase(valueA, valueB) {
  return valueA.toLowerCase().indexOf(valueB.toLowerCase()) !== -1;
}
