import ShoppingListDataAPI from "./ShoppingListDataAPI";
import { get, post, put } from "service/HttpAPI";

const {
  saveShoppingListAsync,
  updateShoppingListAsync,
  getShoppingList,
} = ShoppingListDataAPI({
  httpAPI: { get, post, put },
});

export default {
  saveShoppingListAsync,
  updateShoppingListAsync,
  getShoppingList,
};
