import ShoppingListGateway from "./ShoppingListGateway";
import { get, post, put } from "service/TemporaryAPI";

const {
  saveShoppingListAsync,
  updateShoppingListAsync,
  getShoppingList,
} = ShoppingListGateway({
  httpAPI: { get, post, put },
});

export default {
  saveShoppingListAsync,
  updateShoppingListAsync,
  getShoppingList,
};
