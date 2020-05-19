import {
  SET_FILTER_NAME,
  SET_DISPLAY_LIST,
  FLAG_PICKED_SHOP_PROD,
} from "app-redux/actions/ListFilterAction";
const initialState = {
  displayList: [],
  textFilter: "",
};
export default function ListFilterReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_FILTER_NAME:
      const tempList = payload.listDB;
      const result = tempList.filter((parentList) => {
        parentList.products = parentList.products.filter((prod) =>
          compareIgnoreCase(prod.name, payload.textFilter)
        );
        return parentList.products.length > 0;
      });
      return { textFilter: payload.textFilter, displayList: result };
    case SET_DISPLAY_LIST:
      return { textFilter: "", displayList: payload.listDB };
    case FLAG_PICKED_SHOP_PROD:
      const newList = state.displayList.map((cat) => {
        const prods = [...cat.products];
        prods.forEach((prod) => {
          if (prod.id === payload.id) {
            prod.picked = payload.picked;
          }
        });
        cat.products = prods;
        return cat;
      });
      return { textFilter: state.textFilter, displayList: newList };
    default:
      return state;
  }
}

function compareIgnoreCase(valueA, valueB) {
  return valueA.toLowerCase().indexOf(valueB.toLowerCase()) !== -1;
}
