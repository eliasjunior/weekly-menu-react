import { requiredParameter, isEmpty } from "common/Util";

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
  const WEIGHT_DEFAULT = 100;
  return quantityType === "UNIT" ? UNIT_DEFAULT : WEIGHT_DEFAULT;
}
export function sanitizeCategory({ category, isThrow = true, isNew = false }) {
  const { id, name, catProds } = category;

  if (!isNew) {
    if( isEmpty(id)) {
      if (isThrow) {
        requiredParameter(`id ${name} is required`);
      } else {
        console.warn(`${name} is required`);
      }
    }
     
    if (!catProds) {
      if (isThrow) {
        requiredParameter("catProds");
      } else {
        console.warn(`catProds is required`);
      }
      
    }
  }
}

//Private
function validateProd(prodId, products) {
  const product = { ...products.byId[prodId] };
  if (!product) {
    requiredParameter("ProdId in cat");
  }
  return product;
}
