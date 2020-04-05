import {
  RECIPE_CHECK_CLICK,
  RECIPE_CHECK_ALL_CLICK,
  RECIPE_UPDATE_CURRENT,
  RECIPE_UPDATE_NAME,
  RECIPE_UPDATE_ID
} from "app-redux/actions/RecipeAction";
import { requiredParameter } from "common/Util";

const initialState = { name: "", id: null, products: [] };

export default function RecipeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RECIPE_CHECK_CLICK:
      const { product } = payload;
      const originalLength = state.products.length;
      const products = state.products.filter(
        recProd => recProd.id !== product.id
      );
      if (originalLength === products.length) {
        products.push(product);
      }
      return {
        ...state,
        products: [...products]
      };
    case RECIPE_CHECK_ALL_CLICK:
      const { allProds = requiredParameter("allProds"), checked } = payload;
      if (checked) {
        products = allProds.map(recProd => ({
          id: recProd.id,
          name: recProd.name,
          checked: recProd.checked
        }));
      }
      return {
        ...state,
        products: [...products]
      };
    case RECIPE_UPDATE_CURRENT:
      return {
        name: payload.name,
        id: payload.id,
        products: payload.products ? payload.products : []
      };
    case RECIPE_UPDATE_NAME:
      console.log("payload.name", payload.name);
      return {
        ...state,
        name: payload.name
      };
    case RECIPE_UPDATE_ID:
      return {
        ...state,
        id: payload.id
      };
    default:
      return state;
  }
}
