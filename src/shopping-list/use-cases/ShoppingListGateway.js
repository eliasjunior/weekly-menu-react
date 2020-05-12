import { shoppingListConverter, shoppingMapper } from "./ShoppingListMapper";

export default function ShoppingListGateway({ httpAPI }) {
  return {
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
