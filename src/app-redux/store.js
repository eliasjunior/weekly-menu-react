import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import categories from "app-redux/reducers/InventoryReducer";
import listFilter from "app-redux/reducers/ListFilterReducer";
import alertHandler from "app-redux/reducers/AlertHandlerReducer";
import componentFormNames from "app-redux/reducers/ProductFormReducer";
import loading from "app-redux/reducers/LoadingReducer";
import currentRecipe from "app-redux/reducers/RecipeReducer";
import recipes from "app-redux/reducers/RecipesReducer";
import products from "app-redux/reducers/ProductsReducer";
import pageData from "app-redux/reducers/PageReducer";
import selectedProducts from "app-redux/reducers/ProductSelectionReducer";
import quantityMap from "app-redux/reducers/QuantityPickReducer";
import selectedRecIds from "app-redux/reducers/RecipeSelectionReducer";

const rootReducer = combineReducers({
  categories,
  listFilter,
  alertHandler,
  loading,
  componentFormNames,
  currentRecipe,
  recipes,
  products,
  pageData,
  selectedProducts,
  quantityMap,
  selectedRecIds,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
