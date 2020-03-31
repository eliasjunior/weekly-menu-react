import {
  RECIPE_CHECK_CLICK,
  RECIPE_CHECK_ALL_CLICK,
  RECIPE_CURRENT_UPDATE,
  RECIPE_UPDATE_NAME
} from "app-redux/actions/RecipeAction";
import { requiredParameter } from "common/Util";

const initialState = { name: "", id: null, products: [] };

export default function RecipeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RECIPE_CHECK_CLICK:
      const { id } = payload;
      const originalLength = state.products.length;
      const products = state.products.filter(recProd => recProd.id !== id);
      if (originalLength === products.length) {
        products.push(payload);
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
    case RECIPE_CURRENT_UPDATE:
      return {
        name: payload.name,
        id: payload.id,
        products: payload.products ? payload.products : []
      };
    case RECIPE_UPDATE_NAME:
      return {
        ...state,
        name: payload.name
      };
    default:
      return state;
  }
}
