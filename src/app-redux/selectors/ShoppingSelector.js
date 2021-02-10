import { createSelector } from "reselect";

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
