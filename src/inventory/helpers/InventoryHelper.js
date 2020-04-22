import { requiredParameter } from "common/Util";

export function loadProductsToCategory(categories, products) {
  if (!products.byId) {
    return [];
  }
  return categories.reduce((prev, item) => {
    item.products = item.catProds.map((prodId) => products.byId[prodId]);
    prev.push(item);
    return prev;
  }, []);
}

export function loadCategoryWithProducts(categories, products) {
  if (!products.byId) {
    return [];
  }
  return categories.reduce((prev, item) => {
    item.products = item.catProds.map((prodId) => products.byId[prodId]);
    prev.push(item);
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

//TODO delete if not using 22/04, no use right now
export function wrapProdsIntoCategories(
  products,
  { byId = requiredParameter("byId categoryMap") }
) {
  const catset = products.reduce((prev, prod) => {
    const category = byId[prod.catId];
    if (!category) {
      throw new Error("Something wrong, no category for prod", prod.name);
    }

    if (!category.products) {
      category.products = [];
      category.products.push(prod);
    } else {
      const prodOfC = category.products
        .filter((prodOfCat) => prodOfCat.id === prod.id)
        .pop();

      if (!prodOfC) {
        category.products.push(prod);
      } else {
        console.error("there is a prod", prodOfC.name);
      }
    }
    prev.add(category);
    return prev;
  }, new Set());
  console.log(">>>", catset);
}
