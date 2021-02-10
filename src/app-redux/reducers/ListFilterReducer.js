import {
  FLAG_PICKED_SHOP_PROD,
  SET_DISPLAY_LIST,
  SET_FILTER_NAME,
} from "app-redux/actions/ListFilterAction";
import {compareObject, upperCaseFirstChar} from "common/Util";

const initialState = {
  displayList: [],
  payload: {textFilter: "", listDB: []},
};
export default function ListFilterReducer(
  state = initialState,
  {type, payload}
) {
  switch (type) {
    case SET_FILTER_NAME:
      const result = filterBasedOnTextFilter(payload.listDB, payload.textFilter);
      return {
        textFilter: payload.textFilter,
        displayList: result.sort(compareObject),
      };
    case SET_DISPLAY_LIST:
      const {listDB} = payload;
      const transformText = listDB
        .map((cat) => upperCaseFirstChar(cat))
        .map((cat) => {
          cat.products = cat.products.map((prod) => upperCaseFirstChar(prod));
          cat.products.sort(compareObject);
          return cat;
        });

      return {textFilter: "", displayList: transformText.sort(compareObject)};
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
      return {textFilter: state.textFilter, displayList: newList};
    default:
      return state;
  }
}

function compareIgnoreCase(valueA, valueB) {
  return valueA.toLowerCase().indexOf(valueB.toLowerCase()) !== -1;
}

function filterBasedOnTextFilter(tempList = [], textFilter) {
  return tempList
    .filter((category) => {
      const tempProdFiltered = category.products
        .filter((prod) => compareIgnoreCase(prod.name, textFilter))
        .map((prod) => upperCaseFirstChar(prod));

      tempProdFiltered.sort(compareObject);

      const foundProd = tempProdFiltered.length > 0;
      if (!foundProd) {
        return compareIgnoreCase(category.name, textFilter);
      } else {
        category.products = tempProdFiltered;
        return foundProd;
      }
    })
    .map((cat) => upperCaseFirstChar(cat));
}