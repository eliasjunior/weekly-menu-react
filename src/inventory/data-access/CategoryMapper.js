import { requiredParameter } from "common/Util";

export function categoryListMapper(list) {
  return list.map((cat) => categoryMapper(cat));
}

export function categoryMapper({
  id = requiredParameter("id category"),
  name = requiredParameter("name"),
  products,
}) {
  return {
    id,
    name,
    catProds: products ? products.map((prod) => prod.id) : [],
    products,
  };
}

//TODO review here, update not sending catProds that does not exist
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
    id,
    name,
    catProds,
  };
}
