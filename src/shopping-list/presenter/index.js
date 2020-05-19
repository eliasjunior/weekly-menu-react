import ShoppingListUseCase from "../use-cases";
import { requiredParameter } from "common/Util";

const {
  saveShoppingListAsync,
  updateShoppingListAsync,
  getShoppingList,
} = ShoppingListUseCase;

export const postShoppingList = saveShoppingListAsync;
export const putShoppingList = updateShoppingListAsync;
export const getShoppingHistory = getShoppingList;

//TODO move this to helpers folder
export function buildShopListPayload(
  { byId = requiredParameter("byId"), selected = requiredParameter("byId") },
  APIs = {}
) {
  const result = Object.entries(byId).reduce((prev, [_, prod]) => {
    prev.push({
      id: prod.id,
      recipes: prod.recipes ? prod.recipes : [],
      selected: selected.filter((prodId) => prodId === prod.id).length === 1,
    });

    return prev;
  }, []);
  const { timeAPI = { getTimeLabel: getTimeLabel() } } = APIs;
  return { products: result, name: timeAPI.getTimeLabel };
}

export function normalizeCatProd({ state, catId, prodId, checked }) {
  const { products, categories } = state;
  const category = categories.byId[catId];
  const addSimpleProduct = () => {
    const product = products.byId[prodId];
    if (!product) {
      products.byId[prodId] = {
        id: prodId,
        recipes: [],
      };
    }
  };
  if (!category) {
    // no category, means no prod as weel, state 0
    categories.byId[catId] = {
      id: catId,
      prods: [prodId],
    };
    addSimpleProduct();
    products.selected = [...products.selected, prodId];
  } else {
    if (!checked) {
      // there is prod in the category, recipe add previously, state 1
      if (!category.prods.includes(prodId)) {
        category.prods = [...category.prods, prodId];
        addSimpleProduct();
      }
      // state 2
      // selected only belong to simple product and products.byId doesn't
      products.selected = [...products.selected, prodId];
    } else {
      const product = products.byId[prodId];
      const isProdInRecipe =
        product && product.recipes && product.recipes.length > 0;

      // remove from selected
      products.selected = products.selected.filter((pId) => pId !== prodId);

      // state 3
      if (!isProdInRecipe) {
        category.prods = category.prods.filter((pId) => pId !== prodId);
        delete products.byId[prodId];
        // remove cat if there is no prods
        // state 4
        if (category.prods.length === 0) {
          delete categories.byId[catId];
        }
      }
    }
  }
  return {
    categories: { ...categories },
    products: { ...products },
    recipes: state.recipes,
  };
}

export function normalizeProdRecipe({ state, recId, catId, prodId, checked }) {
  const { products, categories, recipes } = state;

  const product = products.byId[prodId];

  const addProduct = () => {
    const category = categories.byId[catId];
    category.prods = [...category.prods, prodId];
    products.byId[prodId] = {
      id: prodId,
      recipes: [recId],
    };
  };

  //State has recipe
  if (checked) {
    delete recipes.byId[recId];
    product.recipes = product.recipes.filter((rid) => rid !== recId);
    const isProdNotOnSelectedList = !products.selected.includes(prodId);

    // delete product if its not in another rec or in the selected list
    if (product.recipes.length === 0 && isProdNotOnSelectedList) {
      const category = categories.byId[catId];
      category.prods = category.prods.filter((pId) => pId !== prodId);

      // remove cat if there is no prods
      if (category.prods.length === 0) {
        delete categories.byId[catId];
      }
      // if prod is not in another recipe
      delete products.byId[prodId];
    }
  } else {
    recipes.byId[recId] = {
      id: recId,
    };
    //State has no category yet
    const category = categories.byId[catId];
    if (!category) {
      categories.byId[catId] = {
        id: catId,
        prods: [],
      };
      addProduct();
      //State has no product
    } else if (!product) {
      addProduct();
    } else {
      //State has product and is also selected
      if (!product.recipes) {
        product.recipes = [recId];
      } else {
        //State has product and is also into another recipe
        product.recipes = [...product.recipes, recId];
      }
    }
  }
  return {
    ...state,
    categories: { ...categories },
    products: { ...products },
    recipes: { ...recipes },
  };
}

export function buildFromShopHistory({ productMap, shoppingHistory }) {
  const { categories } = normalizeCatShopHistory({
    productMap,
    shoppingHistory,
  });
  const { products } = normalizeProdShopHistory(shoppingHistory);
  const { recipes } = normalizeRecipeShopHistory(shoppingHistory);

  return {
    id: shoppingHistory.id,
    name: shoppingHistory.name,
    categories,
    products,
    recipes,
  };
}

export function normalizeCatShopHistory({
  productMap = requiredParameter("productMap"),
  shoppingHistory = requiredParameter("shoppingHistory"),
}) {
  const { products } = shoppingHistory;
  const byId = products.reduce((prev, prod) => {
    const { byId = requiredParameter("byId") } = productMap;
    if (!byId[prod.id]) {
      requiredParameter("product map");
    }
    const catId = byId[prod.id].catId;

    if (!prev[catId]) {
      prev[catId] = { id: catId, prods: [prod.id] };
    } else {
      prev[catId].prods.push(prod.id);
    }
    return prev;
  }, {});
  return { categories: { byId } };
}

export function normalizeProdShopHistory({
  products = requiredParameter("products"),
}) {
  const result = products.reduce(
    (prev, { id, recipes, selected }) => {
      prev.byId[id] = { id, recipes };
      if (selected) {
        prev.selected.push(id);
      }
      return prev;
    },
    { byId: {}, selected: [] }
  );
  return { products: result };
}

export function normalizeRecipeShopHistory({
  products = requiredParameter("products"),
}) {
  const recSet = products.reduce((prev, { recipes }) => {
    recipes.forEach((recId) => {
      prev.add(recId);
    });
    return prev;
  }, new Set());

  const byId = Array.from(recSet).reduce((prev, id) => {
    prev[id] = { id };
    return prev;
  }, {});

  return { recipes: { byId } };
}

function getTimeLabel() {
  const now = new Date();
  return now
    .toDateString()
    .concat(" ")
    .concat(now.getHours())
    .concat(":")
    .concat(now.getMinutes())
    .concat(":")
    .concat(now.getSeconds());
}
