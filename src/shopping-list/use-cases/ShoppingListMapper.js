import { requiredParameter } from "common/Util";

export function shoppingListMapper(list) {
  return list.map((shopping) => shoppingMapper(shopping));
}

export function shoppingMapper({
  _id = requiredParameter("_id shoppingList"),
  name = requiredParameter("name date"),
  products = requiredParameter("products"),
}) {
  return {
    id: _id,
    name,
    products: products.map((prod) => productMap(prod)),
  };
}

export function shoppingListConverter(shoppingList, isNew = false) {
  const {
    id,
    products = requiredParameter("products"),
    name = requiredParameter("name date"),
  } = shoppingList;
  //isNew is to guarantee that the id was sent, on the update case
  if (!isNew) {
    if (!id) {
      requiredParameter("id shoppingList");
    }
  }

  return {
    _id: id,
    name,
    products: products.map((prod) => productConverter(prod)),
  };
}

function productMap({
  id = requiredParameter("prod id"),
  recipes = requiredParameter("prod id"),
  selected = requiredParameter("selected"),
}) {
  return {
    id,
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
    id,
    recipes,
    selected,
  };
}
