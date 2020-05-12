import ShoppingListGateway from "./ShoppingListGateway";
import { get, post, put } from "service/TemporaryAPI";

const { saveShoppingListAsync, updateShoppingListAsync } = ShoppingListGateway({
  httpAPI: { get, post, put },
});

export default {
  saveShoppingListAsync,
  updateShoppingListAsync,
};
