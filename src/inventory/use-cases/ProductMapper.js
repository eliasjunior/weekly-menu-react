import { requiredParameter } from "common/Util";

export function productMapper({
  _id = requiredParameter("_id"),
  name,
  quantityType,
  catId,
}) {
  return {
    id: _id,
    name,
    quantityType,
    quantityDefault: quantityType === "UNIT" ? 1 : 100,
    catId,
  };
}

export function productConverter({ id, name, quantityType, catId }) {
  return {
    _id: id,
    name,
    quantityType,
    catId,
  };
}

export function productListMapper(list) {
  // normalize
  const makeByIdTable = (
    prev,
    {
      _id: id = requiredParameter("id product"),
      name = requiredParameter("name product"),
      quantityType,
      catId,
    }
  ) => {
    prev.byId[id] = {
      id,
      name,
      quantityType,
      quantityDefault: quantityType === "UNIT" ? 1 : 100,
      catId,
    };
    prev.allIds.push(id);
    return prev;
  };
  return list.reduce(makeByIdTable, { byId: {}, allIds: [] });
}
