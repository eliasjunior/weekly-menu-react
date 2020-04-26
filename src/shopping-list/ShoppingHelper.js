import { normalizeCategory } from "inventory/helpers/InventoryHelper";
import { requiredParameter } from "common/Util";
//TODO create factory to all these function
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

export function loadProductsChosenRecipes({ selectedRecipes, productMap }) {
  let products = new Set();
  selectedRecipes.forEach(({ prodsDetail, name, id }) => {
    prodsDetail.forEach((details) => {
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

//TODO if it works delete above, improve here
// export function wrapProdsToCats(products, categoryMap) {
//   const categories = new Map();

//   const { byId = requiredParameter("byId") } = categoryMap;

//   products.forEach((prod) => {
//     const category = byId[prod.catId];

//     const tempCat = categories.get(prod.catId);
//     if (tempCat) {
//       // Prods wont repeat even for the recipe because has been validated
//       prodTemp.recipes.push(prod);
//     } else {
//       category.products = [];
//       category.products.push(prod);
//       categories.set(prod.catId, category);
//     }
//   });
//   console.log("SELECTED categories", Array.from(categories.values()));
//   return Array.from(categories.values());
// }

// export function mergeProducts({ prodsRecipe, prodsSelected }) {
//   const prodsResult = prodsRecipe.reduce((prodsPrev, prodRecipe) => {
//     const prodIn = prodsPrev.find((prod) => prod.id === prodRecipe.id);

//     // if (prodIn) {

//     // } else {
//     //   prodsPrev.push(prodRecipe);
//     // }
//     prodsPrev.push(prodRecipe);
//     return prodsPrev;
//   }, prodsSelected);
//   return prodsRecipe;
// }

// export function mergeCategories(categoriesRec, categories) {
//   const catsResult = categoriesRec
//     .concat(categories)
//     .reduce((prev, current) => {
//       // add to map
//       // if is in Map found conflict
//       // merge produtscs in
//       // no conflich add
//       const catIn = prev.get(current.id);

//       if (catIn) {
//         const result = mergeProducts({
//           prodsRecipe: current.products,
//           prods: catIn.products,
//         });
//       } else {
//         prev.set(current.id, current);
//       }

//       return prev;
//     }, new Map());

//   console.log("result", catsResult);

//   return Array.from(catsResult.values());
// }

//tremendous amount of test
export function addRecipeProductsToCategory({
  categoriesDB,
  catsWithProdsSelected,
  productSetChosenRecipes,
}) {
  const categoriesMap = normalizeCategory(categoriesDB);
  let catSelectedMap = normalizeCategory(catsWithProdsSelected);

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
