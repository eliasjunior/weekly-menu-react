import { createStore, applyMiddleware } from "redux";
import categories from "./reducers/InventoryReducer";
import catsFilter from "./reducers/InventoryFilterReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  categories,
  catsFilter
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
