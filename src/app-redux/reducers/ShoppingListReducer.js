import {
  ADD_SIMPLE_PRODUCT,
  ADD_PRODS_RECIPE,
} from "app-redux/actions/ShoppingListAction";

const initialState = {
  categories: { byId: {} },
  products: { byId: {}, selected: [] },
  recipes: { byId: {} },
};

export default function ShoppingListReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SIMPLE_PRODUCT:
      const { catId, prodId } = payload;
      return normalizeCatProd({ state, catId, prodId });
    case ADD_PRODS_RECIPE:
      const { recId, prods } = payload;

      return prods.reduce((prev, { id, catId }) => {
        prev = normalizeProdRecipe({
          state: prev,
          recId,
          catId,
          prodId: id,
        });
        return prev;
      }, state);
    default:
      return state;
  }
}

function normalizeCatProd({ state, catId, prodId }) {
  const cat = state.categories.byId[catId];
  const { products, categories } = state;
  const addSimpleProduct = () => {
    products.selected = [...products.selected, prodId];
    if (!products.byId[prodId]) {
      products.byId[prodId] = {
        id: prodId,
      };
    }
  };
  if (!cat) {
    categories.byId[catId] = {
      id: catId,
      prods: [prodId],
    };
    addSimpleProduct();
  } else {
    const hasProd = cat.prods.includes(prodId);

    // selected is like the product it's into another recipe,
    // I can only remove the prod from category if there is no recipe or selected product
    // however its mixed up the rules, recipe x selected, I need to review and refactor it
    // I can't remove the prod from cat if prod is in another recipe
    const prodOnlyOnCurrentRecipe =
      products.byId[prodId] && products.byId[prodId].recipes.length === 0;

    if (!hasProd) {
      cat.prods = [...cat.prods, prodId];
      addSimpleProduct();
    } else if (prodOnlyOnCurrentRecipe) {
      cat.prods = cat.prods.filter((pId) => pId !== prodId);

      products.selected = products.selected.filter((pId) => pId !== prodId);

      // remove cat if there is no prods
      if (cat.prods.length === 0) {
        delete categories.byId[catId];
      }
    } else {
      const fromSelected = products.selected.includes(prodId);
      if (!fromSelected) {
        addSimpleProduct();
      }
    }
  }
  return {
    categories: { ...categories },
    products: { ...products },
    recipes: state.recipes,
  };
}

function normalizeProdRecipe({ state, recId, catId, prodId }) {
  const { products, categories, recipes } = state;
  const addProdAndRecipe = () => {
    products.byId[prodId] = {
      id: prodId,
      recipes: [recId],
    };
    recipes.byId[recId] = {
      id: recId,
    };
  };

  const recipe = recipes.byId[recId];
  if (recipe) {
    delete recipes.byId[recId];
  }

  const cat = categories.byId[catId];

  if (!cat) {
    categories.byId[catId] = {
      id: catId,
      prods: [prodId],
    };
    addProdAndRecipe();
  } else {
    const curProd = products.byId[prodId];

    // tenho a cat nao add
    // nao tenho cat, tenho o PROD ? nao add
    // tenho o prod

    if (!curProd) {
      cat.prods = [...cat.prods, prodId];
      //TODO test can I have the recipe already IN ??
      addProdAndRecipe();
    } else {
      // selected is like the product it's into another recipe,
      // I can only remove the prod from category if there is no recipe or selected product
      // however its mixed up the rules, recipe x selected, I need to review and refactor it
      // I can't remove the prod from cat if prod is in another recipe

      const prodOnlyOnCurrentRecipe =
        curProd.recipes &&
        curProd.recipes.filter((rid) => rid !== recId).length === 0;

      const isProdNotOnSelectedList = !products.selected.includes(prodId);

      console.log(prodOnlyOnCurrentRecipe, isProdNotOnSelectedList, curProd.id);

      if (prodOnlyOnCurrentRecipe && isProdNotOnSelectedList) {
        cat.prods = cat.prods.filter((pId) => pId !== prodId);

        // remove cat if there is no prods
        if (cat.prods.length === 0) {
          delete categories.byId[catId];
        }
        // if prod is not in another recipe
        delete products.byId[prodId];
      } else if (curProd.recipes) {
        // should add recipe
        const hasNotRecipe =
          curProd.recipes.filter((rid) => rid === recId).length === 0;
        if (hasNotRecipe) {
          curProd.recipes = [...curProd.recipes, recId];
        } else {
          curProd.recipes = curProd.recipes.filter((rid) => rid !== recId);
        }
      }
    }
  }
  return {
    ...state,
    categories: { ...categories },
    products: { ...products },
    recipes: { ...state.recipes },
  };
}
