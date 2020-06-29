import { requiredParameter } from "common/Util";

export function recipeListMapper(list) {
  // normalize
  const makeByIdTable = (
    prev,
    { id = requiredParameter("id recipe"), name, prodsDetail = [] }
  ) => {
    prev.byId[id] = {
      id,
      name,
      prodsDetail: prodsDetail.map((detail) => prodDetailMapper(detail)),
    };
    prev.allIds.push(id);
    return prev;
  };
  return list.reduce(makeByIdTable, { byId: {}, allIds: [] });
}

//TODO move to mapper file ?
export function recipeMapper({
  id = requiredParameter("id recipe"),
  name = requiredParameter("name recipe"),
  prodsDetail = [],
}) {
  return {
    id,
    name,
    prodsDetail: prodsDetail.map((detail) => prodDetailMapper(detail)),
  };
}

export function recipeConverter(recipe, isNew = false) {
  const {
    id,
    name = requiredParameter("name recipe"),
    prodsDetail = requiredParameter("prodsDetail recipe"),
  } = recipe;
  //isNew is to guarantee that the id was sent, on the update case
  if (!isNew) {
    if (!id) {
      requiredParameter("id recipe");
    }
  }
  return {
    id,
    name,
    prodsDetail: prodsDetail.map((detail) => prodDetailConverter(detail)),
  };
}

function prodDetailConverter({ id, quantity }) {
  return {
    prodId: id,
    quantity,
  };
}

function prodDetailMapper({ prodId, quantity }) {
  return {
    id: prodId,
    quantity,
  };
}
