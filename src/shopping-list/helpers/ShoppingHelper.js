import { requiredParameter } from "common/Util";
import {
  UNIT_TYPE,
  UNIT_LABEL,
  WEIGHT_LABEL,
} from "inventory/product/Constant";

export function setProductQty(product, quantities) {
  const {
    quantityDefault = requiredParameter("quantityDefault"),
    quantityType = requiredParameter("quantity type"),
    id = requiredParameter("prod id"),
  } = product;
  const value = quantities[id];
  const quantity = value ? value : quantityDefault;
  const result = getQuantityLabel({
    quantity,
    quantityType,
  });
  const quantityDisplay = result;
  return { ...product, quantity, quantityDisplay };
}

export function mergeRecipeProducts(recipeMap, categoriesDisplay) {
  return categoriesDisplay.map((category) => {
    category.products = rebuildProducts(category.products, recipeMap);
    return category;
  });
}

export function buildShoppingListDisplay({
  shoppingListMap,
  categoryMap,
  productMap,
  quantities,
}) {
  const { categories, products } = shoppingListMap;
  const categoryIds = Object.keys(categories.byId);
  return categoryIds.reduce((prev, catId) => {
    const catShopList = categories.byId[catId];
    const productList = catShopList.prods
      .map((prodId) => buildProduct(prodId, productMap, products))
      .map((prod) => setProductQty(prod, quantities));

    const { name, id } = categoryMap.byId[catId];
    prev.push({
      name,
      id,
      products: productList,
    });
    return prev;
  }, []);
}

function rebuildProducts(products, recipeMap) {
  return products.map((product) => {
    const { recipes } = product;
    const getRecipeData = (prev, recId) => {
      const { prodsDetail, name } = recipeMap.byId[recId];

      const detail = prodsDetail
        .filter((detail) => detail.id === product.id)
        .pop();

      if (!detail) {
        requiredParameter("prod detail");
      }

      prev.push({
        name,
        quantity: detail.quantity,
      });
      return prev;
    };
    const sumQuantitiesAndLabel = ({ totalRecipes, recipesLabel }, recipe) => {
      totalRecipes = totalRecipes + recipe.quantity;
      recipesLabel = recipesLabel + recipe.name + ", ";
      return { totalRecipes, recipesLabel };
    };
    const { totalRecipes, recipesLabel } = recipes
      .reduce(getRecipeData, [])
      .reduce(sumQuantitiesAndLabel, {
        totalRecipes: 0,
        recipesLabel: "",
      });

    //TODO review these rules later
    if (recipesLabel !== "") {
      product.recDisplay = recipesLabel;
      product.quantity = product.selected
        ? product.quantity + totalRecipes
        : totalRecipes;
      product.quantityDisplay = getQuantityLabel({
        quantity: product.quantity,
        quantityType: product.quantityType,
      });
    }

    return product;
  });
}

function getQuantityLabel({ quantity, quantityType }) {
  const label = quantityType === UNIT_TYPE ? UNIT_LABEL : WEIGHT_LABEL;
  return quantity + " " + label;
}

function buildProduct(prodId, productMap, products) {
  const { name, id, catId, quantityDefault, quantityType } = productMap.byId[
    prodId
  ];
  const { recipes } = products.byId[prodId];
  return {
    name,
    id,
    catId,
    quantityDefault,
    quantityType,
    recipes,
    selected: products.selected.filter((prodId) => prodId === id).length > 0,
  };
}
