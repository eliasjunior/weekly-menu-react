import { requiredParameter } from "common/Util";
import { sanitizeCategory } from "inventory/helpers/InventoryHelper";

export function categoryListMapper(list) {
  return list.map((cat) => categoryMapper(cat));
}

export function categoryMapper({
  id = requiredParameter("id category"),
  name = requiredParameter("name"),
  products,
}) {
  return {
    id,
    name,
    catProds: products ? products.map((prod) => prod.id) : [],
    products,
  };
}

export function categoryConverter(category, isNew = false) {
  const { name = requiredParameter("name category"), catProds, id } = category;
  sanitizeCategory({ category, isNew });
  return {
    id,
    name,
    catProds,
  };
}
