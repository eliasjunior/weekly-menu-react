import { requiredParameter } from "common/Util";

export function recipeListMapper(list) {
  return list.map((rec) => recipeMapper(rec));
}

//TODO move to mapper file ?
export function recipeMapper({
  _id = requiredParameter("_id recipe"),
  name = requiredParameter("name recipe"),
  recProds = [],
}) {
  return {
    id: _id,
    name,
    recProds,
  };
}

export function recipeConverter(recipe, isNew = false) {
  const {
    id,
    name = requiredParameter("name recipe"),
    recProds = requiredParameter("recProds recipe"),
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
    recProds,
  };
}
