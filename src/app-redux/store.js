import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import categories from "app-redux/reducers/InventoryReducer";
import listFilter from "app-redux/reducers/ListFilterReducer";
import alertHandler from "app-redux/reducers/AlertHandlerReducer";
import componentFormNames from "app-redux/reducers/ProductFormReducer";
import loading from "app-redux/reducers/LoadingReducer";
import currentRecipeRed from "app-redux/reducers/RecipeReducer";
import recipes from "app-redux/reducers/RecipeCrudReducer";
import products from "app-redux/reducers/ProductsReducer";
import pageData from "app-redux/reducers/PageReducer";
import quantityMap from "app-redux/reducers/QuantityPickReducer";
import shoppingList from "app-redux/reducers/ShoppingListReducer";
import selectedProducts from "app-redux/reducers/ProductSelectionReducer";
import shoppingHistory from "app-redux/reducers/ShoppingHistoryReducer";

const rootReducer = combineReducers({
  categories,
  listFilter,
  alertHandler,
  loading,
  componentFormNames,
  currentRecipeRed,
  recipes,
  products,
  pageData,
  quantityMap,
  shoppingList,
  selectedProducts,
  shoppingHistory,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
