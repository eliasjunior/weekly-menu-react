import {
  SET_FILTER_NAME,
  SET_DISPLAY_LIST,
  FLAG_PICKED_SHOP_PROD,
} from "app-redux/actions/ListFilterAction";
import { upperCaseFirstChar, compareObject } from "common/Util";
const initialState = {
  displayList: [],
  payload: { textFilter: "", listDB: [] },
};
export default function ListFilterReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_FILTER_NAME:
      const tempList = payload.listDB;
      const result = tempList
        .filter((category) => {
          category.products = category.products
            .filter((prod) => compareIgnoreCase(prod.name, payload.textFilter))
            .map((prod) => upperCaseFirstChar(prod));
          category.products.sort(compareObject);
          return category.products.length > 0;
        })
        .map((cat) => upperCaseFirstChar(cat));
      return {
        textFilter: payload.textFilter,
        displayList: result.sort(compareObject),
      };
    case SET_DISPLAY_LIST:
      const { listDB } = payload;
      const transformText = listDB
        .map((cat) => upperCaseFirstChar(cat))
        .map((cat) => {
          cat.products = cat.products.map((prod) => upperCaseFirstChar(prod));
          cat.products.sort(compareObject);
          return cat;
        });

      return { textFilter: "", displayList: transformText.sort(compareObject) };
    case FLAG_PICKED_SHOP_PROD:
      const newList = state.displayList
        .map((cat) => {
          const prods = [...cat.products];
          prods.forEach((prod) => {
            if (prod.id === payload.id) {
              prod.picked = payload.picked;
            }
          });

          cat.products = prods.map((prod) => upperCaseFirstChar(prod));
          cat.products.sort(compareObject);
          return cat;
        })
        .map((cat) => upperCaseFirstChar(cat));
      return { textFilter: state.textFilter, displayList: newList };
    default:
      return state;
  }
}

function compareIgnoreCase(valueA, valueB) {
  return valueA.toLowerCase().indexOf(valueB.toLowerCase()) !== -1;
}
