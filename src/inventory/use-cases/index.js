//  import RestAPI from "../vendor/rest-API";
import inventoryUseCase from "./inventory";
import CategoryService from "../category/services/CategoryService";
import Productservice from "../product/service/ProductService";

const { getCategories, updateCategory } = inventoryUseCase({
  CategoryService,
  Productservice
});

export default {
  getCategories,
  updateCategory
};
