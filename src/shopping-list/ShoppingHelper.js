import { createSelector } from "reselect";

export function loadChosenProducts({
  productMap,
  selectedProducts,
  quantities,
}) {
  const pickedProds = selectedProducts
    .map((id) => productMap.byId[id])
    .map((prod) => {
      const qty = quantities[prod.id];
      if (qty) {
        prod.quantity = qty;
      } else {
        prod.quantity = 1;
      }
      return prod;
    });
  return pickedProds;
}

export function loadChosenCategories({
  categories,
  chosenProducts,
  productsChosenRecipes,
}) {
  const chosenCategories = categories.reduce((prev, category) => {
    const prodsCurrentCat = loadProdsFromCategory(
      chosenProducts,
      category.catProds
    );
    if (prodsCurrentCat.length > 0) {
      category.products = prodsCurrentCat;
      prev.push(category);
    }
    return prev;
  }, []);

  // within recipes
  chosenCategories.forEach((category) => {
    // current category
    // check if the recs products is already in there
    productsChosenRecipes.forEach((prodRec) => {
      // yes add the recipes reference

      const prodsInThere = category.products.filter(
        // on going
        (prodCat) => prodCat.id === prodRec.id
      );

      // no add the product to category
    });
  });

  console.log("final categories", chosenCategories);
  return chosenCategories;
}

export function loadProductsChosenRecipes({ selectedRecipes, productMap }) {
  let products = new Set();
  selectedRecipes.forEach(({ prodDetails, name, id }) => {
    prodDetails.forEach((details) => {
      const prodLoaded = productMap.byId[details.id];
      if (!prodLoaded.recipes) {
        prodLoaded.recipes = new Set();
      }
      prodLoaded.recipes.add({ name, id });
      products.add(prodLoaded);
    });
  });
  return products;
}

export function mergeCategories() {}

// experiment --- move to app-redux if is good
export const pickedProdsSelector = createSelector(
  (state) => state.selectedProducts,
  (ids) => ids
);

export const quantitiesSelector = createSelector(
  (state) => state.quantityMap,
  (qtd) => qtd
);

export const productMapSelector = createSelector(
  (state) => state.products,
  (prodMap) => prodMap
);

export const categoriesSelector = createSelector(
  (state) => state.categories,
  (categories) => categories
);

// private
function loadProdsFromCategory(products, catIdProds) {
  return products.filter(({ id }) => catIdProds.includes(id));
}
