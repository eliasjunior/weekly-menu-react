export function loadProductsToRecipe(recipes, allProducts) {
  if (!allProducts.byId) {
    return [];
  }
  return recipes.reduce((prev, item) => {
    item.products = item.recProds.map((prodId) => allProducts.byId[prodId]);
    prev.push(item);
    return prev;
  }, []);
}
