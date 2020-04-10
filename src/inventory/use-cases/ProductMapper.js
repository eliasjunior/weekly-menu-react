import { requiredParameter } from "common/Util";

export function productListMapper(list) {
  return list.map((prod) => productMapper(prod));
}
export function productMapper({ _id = requiredParameter("_id"), name }) {
  return {
    id: _id,
    name,
  };
}

export function productConverter({ id, name }) {
  return {
    _id: id,
    name,
  };
}
