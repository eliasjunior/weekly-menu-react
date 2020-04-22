export function loadProductsToRecipe(recipes, allProducts) {
  if (!allProducts.byId) {
    return [];
  }
  const { byId, allIds = [] } = recipes;
  return allIds.reduce((prev, recId) => {
    const recipe = byId[recId];
    recipe.products = recipe.prodDetails.map(({ id }) => allProducts.byId[id]);
    prev.push(recipe);
    return prev;
  }, []);
}
