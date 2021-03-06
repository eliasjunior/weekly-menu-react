import {
  shoppingListConverter,
  shoppingMapper,
  shoppingListMapper,
} from "./ShoppingListMapper";
import { cleanFromApi } from "common/Util";

export default function ShoppingListDataAPI({ httpAPI }) {
  return {
    getShoppingList: async () => {
      try {
        const data = await httpAPI.get("carts");
        return shoppingListMapper(cleanFromApi(data));
      } catch (error) {
        throw error;
      }
    },
    saveShoppingListAsync: async (shoppingList) => {
      try {
        const data = await httpAPI.post(
          "carts",
          shoppingListConverter(shoppingList, true)
        );
        return shoppingMapper(data);
      } catch (error) {
        throw error;
      }
    },
    updateShoppingListAsync: async (shoppingList) => {
      try {
        await httpAPI.put("carts", shoppingListConverter(shoppingList));
      } catch (error) {
        throw error;
      }
    },
  };
}
