import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import categories from "app-redux/reducers/InventoryReducer";
import catsFilter from "app-redux/reducers/InventoryFilterReducer";
import errorHandler from "app-redux/reducers/ErrorHandlerReducer";
import alertHandler from "app-redux/reducers/AlertHandlerReducer";
import componentFormNames from "app-redux/reducers/ProductFormReducer";
import loading from "app-redux/reducers/LoadingReducer";
import recipeProds from "app-redux/reducers/RecipeReducer";

const rootReducer = combineReducers({
  categories,
  catsFilter,
  errorHandler,
  alertHandler,
  loading,
  componentFormNames,
  recipeProds
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
