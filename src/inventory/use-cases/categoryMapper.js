import { requiredParameter } from "common/Util";

export function categoryListMapper(list) {
  return list.map((cat) => categoryMapper(cat));
}

export function categoryMapper({
  _id = requiredParameter("_id category"),
  name,
  catProds = requiredParameter("catProds"),
}) {
  return {
    id: _id,
    name,
    catProds,
  };
}

export function categoryConverter({
  id = requiredParameter("id category"),
  name = requiredParameter("name category"),
  catProds = requiredParameter("catProds"),
}) {
  return {
    _id: id,
    name,
    catProds,
  };
}
