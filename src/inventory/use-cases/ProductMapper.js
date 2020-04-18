import { requiredParameter } from "common/Util";

// export function productListMapper(list) {
//   return list.map((prod) => productMapper(prod));
// }
//TODO now I need to add the keys in 2 places, normalized as well, review this
export function productMapper({
  _id = requiredParameter("_id"),
  name,
  quantityType,
}) {
  return {
    id: _id,
    name,
    quantityType,
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
    };
    prev.allIds.push(id);
    return prev;
  };
  return list.reduce(makeByIdTable, { byId: {}, allIds: [] });
}
