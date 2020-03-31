import { RECIPE_CREATE, FETCH_RECIPES } from "app-redux/actions/RecipesActions";

const initialState = [];

export default function RecipesReducer(state = initialState, action) {
  const { type, payload, recipes } = action;
  switch (type) {
    case RECIPE_CREATE:
      const result = [...state];
      //TODO test error here like this const [name, id, products] = payload;
      const { name, id, products } = payload;
      const recipe = {
        name,
        id,
        products
      };
      result.push(recipe);
      return result;
    case FETCH_RECIPES:
      return [...recipes];
    default:
      return state;
  }
}
