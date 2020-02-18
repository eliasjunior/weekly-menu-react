//  import RestAPI from "../vendor/rest-API";
import inventoryUseCase from "./inventory";

//const { getPlayerList, updatePlayerList, addAll } = persistenceAPI();

const { categories } = inventoryUseCase({});

export default {
  getCategories: () => {
      return [];
  }
};