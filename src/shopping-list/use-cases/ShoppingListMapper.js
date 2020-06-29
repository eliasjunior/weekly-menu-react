import { requiredParameter } from "common/Util";

export function shoppingListMapper(list) {
  return list.map((shopping) => shoppingMapper(shopping));
}

export function shoppingMapper({
  id = requiredParameter("id shoppingList"),
  name = requiredParameter("name date"),
  productItems = requiredParameter("productItems"),
}) {
  return {
    id,
    name,
    products: productItems.map((prod) => productMap(prod)),
  };
}

export function shoppingListConverter(shoppingList, isNew = false) {
  const {
    id,
    products = requiredParameter("productItems"),
    name = requiredParameter("name date"),
  } = shoppingList;
  //isNew is to guarantee that the id was sent, on the update case
  if (!isNew && !id) {
    requiredParameter("id shoppingList");
  }

  return {
    id,
    name,
    productItems: products.map((prod) => productConverter(prod)),
  };
}

function productMap({
  prodId = requiredParameter("prod id"),
  recipes = requiredParameter("prod id"),
  selected = requiredParameter("selected"),
}) {
  return {
    id: prodId,
    recipes,
    selected,
  };
}

function productConverter({
  id = requiredParameter("prod id"),
  recipes = requiredParameter("prod id"),
  selected = requiredParameter("selected"),
}) {
  return {
    prodId: id,
    recipes,
    selected,
  };
}
