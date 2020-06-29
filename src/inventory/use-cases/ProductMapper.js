import { requiredParameter } from "common/Util";

export function productMapper({
  id = requiredParameter("id"),
  name = requiredParameter("name product"),
  quantityType = requiredParameter("quantityType"),
  catId = requiredParameter("catId product"),
}) {
  return {
    id,
    name,
    quantityType,
    quantityDefault: quantityType === "UNIT" ? 1 : 100,
    catId,
  };
}

export function productConverter(
  {
    id,
    name = requiredParameter("name product"),
    quantityType = requiredParameter("quantityType"),
    catId = requiredParameter("catId product"),
  },
  isUpdate = false
) {
  if (isUpdate && !id) {
    requiredParameter("id product");
  }
  return {
    id,
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
      id = requiredParameter("id product"),
      name = requiredParameter("name product"),
      quantityType = requiredParameter("name product"),
      catId = requiredParameter("name product"),
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
