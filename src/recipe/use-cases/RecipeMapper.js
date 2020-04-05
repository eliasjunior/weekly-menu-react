import {
  productsMapper,
  productsConverter
} from "inventory/use-cases/CategoryMapper";
import { requiredParameter } from "common/Util";

export function recipeListMapper(list) {
  return list.map(rec => recipeMapper(rec));
}

//TODO move to mapper file ?
export function recipeMapper({
  _id = requiredParameter("_id recipe"),
  name = requiredParameter("name recipe"),
  recProds = requiredParameter("recProds"),
  products
}) {
  return {
    id: _id,
    name,
    products: productsMapper(products),
    recProds
  };
}

export function recipeConverter(recipe, isNew = false) {
  const {
    id,
    name = requiredParameter("name recipe"),
    products,
    recProds
  } = recipe;
  //isNew is to guarantee that the id was sent, on the update case
  if (!isNew && !id) {
    throw new Error("id recipe is required");
  }

  return {
    _id: id,
    name,
    recProds,
    products: productsConverter(products)
  };
}
