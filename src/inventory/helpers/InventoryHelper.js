import { requiredParameter } from "common/Util";

export function loadProductsToCategory(categories, products) {
  if (!products.byId) {
    return [];
  }

  return categories.reduce((prev, category) => {
    category.products = category.catProds.map((prodId) =>
      validateProd(prodId, products)
    );
    prev.push(category);
    return prev;
  }, []);
}

export function loadCategoryWithProducts(categories, products) {
  if (!products.byId) {
    return [];
  }
  return categories.reduce((prev, category) => {
    category.products = category.catProds.map((prodId) =>
      validateProd(prodId, products)
    );
    prev.push(category);
    return prev;
  }, []);
}

export function normalizeCategory(categories) {
  //  products for display only
  const makeByIdTable = (
    prev,
    {
      id = requiredParameter("id category"),
      name,
      catProds = [],
      products = [],
    }
  ) => {
    prev.byId[id] = {
      id,
      name,
      catProds,
      products,
    };
    prev.allIds.push(id);
    return prev;
  };
  return categories.reduce(makeByIdTable, { byId: {}, allIds: [] });
}

export function getQdyDefault(quantityType) {
  const UNIT_DEFAULT = 1;
  const WEIGTH_DEFAULT = 100;
  return quantityType === "UNIT" ? UNIT_DEFAULT : WEIGTH_DEFAULT;
}

//TODO change to similar recipe sanitize
function validateProd(prodId, products) {
  const product = { ...products.byId[prodId] };
  if (!product) {
    requiredParameter("ProdId in cat");
  }
  return product;
}
