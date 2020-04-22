import { requiredParameter } from "common/Util";

export function recipeListMapper(list) {
  // normalize
  const makeByIdTable = (
    prev,
    { _id: id = requiredParameter("id recipe"), name, prodDetails = [] }
  ) => {
    prev.byId[id] = {
      id,
      name,
      prodDetails,
    };
    prev.allIds.push(id);
    return prev;
  };
  return list.reduce(makeByIdTable, { byId: {}, allIds: [] });
}

//TODO move to mapper file ?
export function recipeMapper({
  _id = requiredParameter("_id recipe"),
  name = requiredParameter("name recipe"),
  prodDetails = [],
}) {
  return {
    id: _id,
    name,
    prodDetails,
  };
}

export function recipeConverter(recipe, isNew = false) {
  const {
    id,
    name = requiredParameter("name recipe"),
    prodDetails = requiredParameter("prodDetails recipe"),
  } = recipe;
  //isNew is to guarantee that the id was sent, on the update case
  if (!isNew) {
    if (!id) {
      requiredParameter("id recipe");
    }
  }

  return {
    _id: id,
    name,
    prodDetails,
  };
}
