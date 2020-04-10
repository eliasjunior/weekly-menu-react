import {
  RECIPE_CREATE,
  FETCH_RECIPES,
  RECIPE_UPDATE,
} from "app-redux/actions/RecipesActions";

const initialState = [];

export default function RecipesReducer(state = initialState, action) {
  const { type, payload, recipes } = action;
  switch (type) {
    case RECIPE_CREATE:
      const result = [...state];
      //TODO test error here like this const [name, id, products] = payload;
      const { name, id } = payload;
      const recipe = {
        name,
        id,
      };
      result.push(recipe);
      return result;
    case RECIPE_UPDATE:
      const tempRecipes = state.filter((rec) => rec.id !== payload.id);
      tempRecipes.push(payload);
      return tempRecipes;
    case FETCH_RECIPES:
      return [...recipes];
    default:
      return state;
  }
}
