import { requiredParameter } from "common/Util";

export function shoppingListMapper(list) {
  return list.map((shopping) => shoppingMapper(shopping));
}

export function shoppingMapper({
  id = requiredParameter("id cart"),
  name = requiredParameter("name date"),
  cartItems = requiredParameter("cartItems", false),
}) {
  return {
    id,
    name,
    products: cartItems.map((cartItem) => productMap(cartItem)),
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
    cartItems: products.map((prod) => productConverter(prod)),
  };
}

function productMap({
  prodId = requiredParameter("prod id"),
  recipes = requiredParameter("recipe ids"),
  selected = requiredParameter("selected"),
  id = requiredParameter("cartItem")
}) {
  return {
    id: prodId,
    recipes,
    selected,
    itemIdOfCart: id
  };
}

function productConverter({
  id = requiredParameter("prod id"),
  recipes = requiredParameter("prod id"),
  selected = requiredParameter("selected"),
  itemIdOfCart
}) {
  return {
    prodId: id,
    recipes,
    selected,
    id: itemIdOfCart
  };
}
