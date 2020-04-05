import { requiredParameter } from "common/Util";
export function categoryListMapper(list) {
  return list.map(cat => categoryMapper(cat));
}
export function categoryMapper(categoryResponse) {
  return {
    id: categoryResponse._id,
    name: categoryResponse.name,
    products: productsMapper(categoryResponse.products)
  };
}

export function productsMapper(products = []) {
  return products.map(({ _id, name, catId = requiredParameter("catId") }) => ({
    id: _id,
    name,
    catId
  }));
}

export function productsConverter(products = []) {
  return products.map(({ id, name, catId = requiredParameter("catId") }) => ({
    _id: id,
    name,
    catId
  }));
}

export function categoryConverter({
  id = requiredParameter("id category"),
  name = requiredParameter("name category"),
  products
}) {
  return {
    _id: id,
    name,
    products: productsConverter(products)
  };
}
