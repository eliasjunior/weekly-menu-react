import ApiService from "service/ApiService";
import { requiredParameter } from "common/Util";

export default {
  getCategories: () => ApiService.get("categories"),
  saveCategoryAsync: category => ApiService.post("categories", category),
  updateCategoryAsync: category => ApiService.put("categories", category),
  getCategoryAsync: id => ApiService.get("categories/" + id),
  updateProductInCategory
};

function updateProductInCategory(
  category = requiredParameter("category"),
  product = requiredParameter("product")
) {
  const products = category.products.reduce((acc, prod) => {
    if (prod.id !== product.id) {
      acc.push(prod);
    } else {
      acc.push(product);
    }
    return acc;
  }, []);
  category.products = products;
  return category;
}
