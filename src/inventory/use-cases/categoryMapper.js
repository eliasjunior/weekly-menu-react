import { requiredParameter } from "common/Util";

export function categoryListMapper(list) {
  return list.map((cat) => categoryMapper(cat));
}

export function categoryMapper({
  _id = requiredParameter("_id category"),
  name = requiredParameter("name"),
  catProds = [],
}) {
  return {
    id: _id,
    name,
    catProds,
  };
}

export function categoryConverter(category, isNew = false) {
  const { name = requiredParameter("name category"), catProds, id } = category;

  if (!isNew) {
    if (!id) {
      requiredParameter("id category");
    }
    if (!catProds) {
      requiredParameter("catProds");
    }
  }
  return {
    _id: id,
    name,
    catProds,
  };
}
