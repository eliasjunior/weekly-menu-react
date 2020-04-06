import { requiredParameter } from "common/Util";

export function productsMapper(products = []) {
  return products.map(({ _id = requiredParameter("_id"), name }) => ({
    id: _id,
    name,
  }));
}

export function productsConverter(products = []) {
  return products.map(({ id, name }) => ({
    _id: id,
    name,
  }));
}
