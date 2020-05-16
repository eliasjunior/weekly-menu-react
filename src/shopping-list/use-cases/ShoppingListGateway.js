import {
  shoppingListConverter,
  shoppingMapper,
  shoppingListMapper,
} from "./shoppingListMapper";

export default function ShoppingListGateway({ httpAPI }) {
  return {
    getShoppingList: async () => {
      try {
        const data = await httpAPI.get("shoppingList");
        return shoppingListMapper(data);
      } catch (error) {
        throw error;
      }
    },
    saveShoppingListAsync: async (shoppingList) => {
      try {
        const data = await httpAPI.post(
          "shoppingList",
          shoppingListConverter(shoppingList, true)
        );
        return shoppingMapper(data);
      } catch (error) {
        throw error;
      }
    },
    updateShoppingListAsync: async (shoppingList) => {
      try {
        const data = await httpAPI.put(
          "shoppingList",
          shoppingListConverter(shoppingList)
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
  };
}
