import CategoryList from "../use-cases";
import Util from "../util/inventoryUtil";

const { getCategories } = CategoryList;

const { compareListsSize } = Util;

const categories = getCategories();
console.log("Loaded cats", categories);

export default {
  categories,
  compareListsSize
};
