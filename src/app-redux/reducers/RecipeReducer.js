import {
  RECIPE_CHECK_CLICK,
  RECIPE_CHECK_ALL_CLICK
} from "app-redux/actions/RecipeAction";
import { requiredParameter } from "common/Util";

const initialState = [];

export default function RecipeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RECIPE_CHECK_CLICK:
      const isInList =
        state.filter(recProd => recProd.prodId === payload.prodId).length > 0;
      if (isInList) {
        return state.filter(recProd => recProd.prodId !== payload.prodId);
      } else {
        state.push(payload);
        return [...state];
      }
    case RECIPE_CHECK_ALL_CLICK:
      const { allProds = requiredParameter("allProds"), checked } = payload;
      if (checked) {
        return allProds.map(recProd => ({
          prodId: recProd.id,
          name: recProd.name,
          checked: recProd.checked
        }));
      } else {
        return [];
      }
    default:
      return state;
  }
}
