import Inventory from "../use-cases";

const { getCategories, updateCategory, saveProduct } = Inventory;

export default {
  getCategories,
  putAction: updateCategory,
  postActionProduct: saveProduct
};
