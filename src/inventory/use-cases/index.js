import ApiService from "service/ApiService";

export default {
  getCategories: () => ApiService.get("categories"),
  saveCategory: category => ApiService.post("categories", category),
  getCategory,
  updateCategory: category => ApiService.put("categories", category),
  updateProduct: productService,
  saveProduct: category => ApiService.post("categories", category)
};

async function productService(product, catId) {
  return {
    updateProduct: async () => {
      try {
        const cats = await getCategory(catId);
        console.log(cats);

        return cats.filter(cat => {
          return cat.products.filter(prod => prod._id === product._id);
        });
      } catch (error) {
        throw error;
      }
    }
  };
}

async function getCategory(id) {
  try {
    return await ApiService.get("categories/" + id);
  } catch (error) {
    throw error;
  }
}
