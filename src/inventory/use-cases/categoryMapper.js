export function categoryListMapper(list) {
  return list.map(cat => categoryMapper(cat));
}
export function categoryMapper(categoryResponse) {
  return {
    id: categoryResponse._id,
    name: categoryResponse.name,
    products: categoryResponse.products.map(({ _id, name }) => ({
      id: _id,
      name
    }))
  };
}

export function categoryConverter(categoryDisplay) {
  return {
    _id: categoryDisplay.id,
    name: categoryDisplay.name,
    products: categoryDisplay.products.map(({ id, name }) => ({
      _id: id,
      name
    }))
  };
}
