import { createSelector } from "reselect";
import { normalizeCategory } from "inventory/helpers/InventoryHelper";

//TODO TEST TEST TEST, very easy to made mistake here,
// REFACTOR as it goes
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
  console.log("prods from selection", pickedProds);
  return pickedProds;
}

// to change this, need a good test case
export function loadChosenCategories({ categories, chosenProducts }) {
  const { byId } = normalizeCategory(categories);
  // catId : [prods]

  let result = new Map();
  chosenProducts.forEach((prod) => {
    const category = byId[prod.catId];

    const temp = result.get(prod.catId);
    if (temp) {
      // in theory prod wont repeat
      temp.products.push(prod);
    } else {
      category.products = [];
      category.products.push(prod);
      result.set(prod.catId, category);
    }
  });
  console.log("SELECTED categories", Array.from(result.values()));
  return Array.from(result.values());
}

//tremendous amount of test
export function addRecipeProductsToCategory({
  categoriesDB,
  catsWithProdsSelected,
  productSetChosenRecipes,
}) {
  const categoriesMap = normalizeCategory(categoriesDB);
  let catSelectedMap = normalizeCategory(catsWithProdsSelected);
  // current category
  // check if the recs products are already in there
  productSetChosenRecipes.forEach((prodRecipe) => {
    // check if prod is in cat
    console.log("searching " + prodRecipe.name + " in chosen cats");
    //TODO rename getCategory
    const catProdSelected = catSelectedMap.byId[prodRecipe.catId];
    console.log("CAT found", catProdSelected);

    // yes, add the recipes to the prod in cat
    if (catProdSelected) {
      // get prod ref
      const prodSelected = catProdSelected.products
        .filter((prod) => prod.id === prodRecipe.id)
        .pop();
      console.log("prodRef", prodSelected);
      //should only have 1 prod that has recipes
      if (prodSelected) {
        // point ref
        prodSelected.recipes = prodRecipe.recipes;
      } else {
        console.log("add rec prod to cat selected");
        catProdSelected.products.push(prodRecipe);
      }
    } else {
      // no, grab the category from catDB and add the prods to it, need deep copy
      console.log("Get cat REDUX");
      const categoryDB = categoriesMap.byId[prodRecipe.catId];
      console.log("Creating cat", categoryDB.name);
      categoryDB.products = [prodRecipe];
      catsWithProdsSelected.push(categoryDB);
      // update map
      catSelectedMap = normalizeCategory(catsWithProdsSelected);
    }
  });
  console.log("merged", catsWithProdsSelected);
  return catsWithProdsSelected; // need to be pure
}

export function loadProductsChosenRecipes({ selectedRecipes, productMap }) {
  let products = new Set();
  selectedRecipes.forEach(({ prodDetails, name, id }) => {
    prodDetails.forEach((details) => {
      const prodLoaded = productMap.byId[details.id];
      if (!prodLoaded.recipes) {
        prodLoaded.recipes = [];
      }
      prodLoaded.recipes.push({ name, id, quantity: details.quantity });
      products.add(prodLoaded);
    });
  });
  console.log("prods from recipe NOT SET", Array.from(products));
  return Array.from(products);
}

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
