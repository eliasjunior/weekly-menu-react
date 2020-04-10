export function loadProductsToRecipe(recipes, allProducts) {
  if (!allProducts.byId) {
    return [];
  }
  return recipes.reduce((prev, item) => {
    const { recProds = [] } = item;
    item.products = recProds.map((prodId) => allProducts.byId[prodId]);
    prev.push(item);
    return prev;
  }, []);
}
