import {
  shoppingListConverter,
  shoppingMapper,
  shoppingListMapper,
} from "./ShoppingListMapper";

export default function ShoppingListGateway({ httpAPI }) {
  return {
    getShoppingList: async () => {
      try {
        const data = await httpAPI.get("carts");
        return shoppingListMapper(data);
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
