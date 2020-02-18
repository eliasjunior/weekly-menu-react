//  import RestAPI from "../vendor/rest-API";
import inventoryUseCase from "./inventory";
import CategoryService from "../category/CategoryService";

const { getCategories } = inventoryUseCase({ CategoryService });

export default {
  getCategories
};
