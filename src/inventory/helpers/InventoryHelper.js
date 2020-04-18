export function loadProductsToCategory(categories, products) {
  if (!products.byId) {
    return [];
  }
  return categories.reduce((prev, item) => {
    item.products = item.catProds.map((prodId) => products.byId[prodId]);
    prev.push(item);
    return prev;
  }, []);
}

export function loadCategoryWithProducts(categories, products) {
  if (!products.byId) {
    return [];
  }
  return categories.reduce((prev, item) => {
    item.products = item.catProds.map((prodId) => products.byId[prodId]);
    prev.push(item);
    return prev;
  }, []);
}
