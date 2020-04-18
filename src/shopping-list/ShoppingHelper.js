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

  console.log("chosenOnes", pickedProds);
  return pickedProds;
}

export function loadChosenCategories({ categoriesDB, chosenProducts }) {
  const chosenCategories = categoriesDB.reduce((prev, category) => {
    const doIHaveProdsInThisCat = chosenProducts.filter(({ id }) =>
      category.catProds.includes(id)
    );
    if (doIHaveProdsInThisCat.length > 0) {
      category.products = doIHaveProdsInThisCat;
      prev.push(category);
    }
    return prev;
  }, []);

  console.log("final fantasy", chosenCategories);
  return chosenCategories;
}

// experiment ---
export const pickedProdsSelector = createSelector(
  (state) => state.selectedProducts,
  (ids) => ids
);

export const quantitiesSelector = createSelector(
  (state) => state.quantityPick,
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
