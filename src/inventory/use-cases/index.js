//  import RestAPI from "../vendor/rest-API";
import inventoryUseCase from "./inventory";
import CategoryService from "../category/CategoryService";
import Productservice from "../product/ProductService";

const { getCategories, updateCategory } = inventoryUseCase({
  CategoryService,
  Productservice
});

export default {
  getCategories,
  updateCategory
};
