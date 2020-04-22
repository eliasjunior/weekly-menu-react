import { requiredParameter } from "common/Util";

export function productMapper({
  _id = requiredParameter("_id"),
  name,
  quantityType,
}) {
  return {
    id: _id,
    name,
    quantityType,
    quantityDefault: quantityType === "UNIT" ? 1 : 100,
  };
}

export function productConverter({ id, name, quantityType }) {
  return {
    _id: id,
    name,
    quantityType,
  };
}

export function productListMapper(list) {
  // normalize
  const makeByIdTable = (
    prev,
    { _id: id = requiredParameter("id product"), name, quantityType }
  ) => {
    prev.byId[id] = {
      id,
      name,
      quantityType,
      quantityDefault: quantityType === "UNIT" ? 1 : 100,
    };
    prev.allIds.push(id);
    return prev;
  };
  return list.reduce(makeByIdTable, { byId: {}, allIds: [] });
}
