import { SET_FILTER_NAME } from "app-redux/actions/ListFilterAction";
import CloneDeep from "lodash.clonedeep";
const initialState = {
  displayList: [],
  textFilter: ""
};
export default function ListFilterReducer(state = initialState, action) {
  const { type, textFilter, listDB } = action;
  switch (type) {
    case SET_FILTER_NAME:
      //TODO remove CloneDeep from here, pass as a copy instead, no dependency
      const tempList = CloneDeep(listDB);
      const result = tempList.filter(parentList => {
        parentList.products = parentList.products.filter(prod =>
          compareIgnoreCase(prod.name, textFilter)
        );
        return parentList.products.length > 0;
      });
      return { textFilter, displayList: result };
    default:
      return state;
  }
}

function compareIgnoreCase(valueA, valueB) {
  return valueA.toLowerCase().indexOf(valueB.toLowerCase()) !== -1;
}
