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

      return prods.reduce((prev, prod) => {
        prev = normalizeCatProd({
          state: prev,
          catId: prod.catId,
          prodId: prod.id,
          recId,
        });
        prev = normalizeProdRecipe(prev, recId, prod.id);
        return prev;
      }, state);

    default:
      return state;
  }
}

function normalizeCatProd({ state, catId, prodId, recId }) {
  const cat = state.categories.byId[catId];
  const { products, categories } = state;

  if (!cat) {
    categories.byId[catId] = {
      id: catId,
      prods: [prodId],
    };
    // only add if its not on selected
    // MARK here rules that apply only to recipe
    if (!recId) {
      products.selected = [prodId];
    }
  } else {
    const hasProd = cat.prods.includes(prodId);

    if (!hasProd) {
      cat.prods = [...cat.prods, prodId];
      products.selected = [...products.selected, prodId];
      // MAKE, rule apply for both, see function, bit different
    } else if (canRemoveProduct({ products, recId, prodId })) {
      cat.prods = cat.prods.filter((pId) => pId !== prodId);

      products.selected = products.selected.filter((pId) => pId !== prodId);

      // remove cat if there is no prods
      if (cat.prods.length === 0) {
        delete categories.byId[catId];
      }
    }
  }
  return {
    categories: { ...categories },
    products: { ...products },
    recipes: state.recipes,
  };
}

function normalizeProdRecipe(state, recId, prodId) {
  const { products, recipes } = state;
  const prodRec = products.byId[prodId];

  if (!prodRec) {
    products.byId[prodId] = {
      id: prodId,
      recipes: [recId],
    };
    recipes.byId[recId] = {
      id: recId,
    };
  } else {
    const hasRec = prodRec.recipes.includes(recId);

    if (hasRec) {
      delete products.byId[prodId];
      delete recipes.byId[recId];
    } else {
      prodRec.recipes = [...prodRec.recipes, recId];
    }
  }
  return { ...state, products: { ...products }, recipes: { ...state.recipes } };
}

// selected is like the product it's into another recipe,
// I can only remove the prod from category if there is no recipe or selected product
// however its mixed up the rules, recipe x selected, I need to review and refactor it
// I can't remove the prod from cat if prod is in another recipe
function canRemoveProduct({ products, prodId, recId }) {
  if (recId) {
    const prodOnlyOnCurrentRecipe =
      products.byId[prodId] &&
      products.byId[prodId].recipes.filter((rid) => rid !== recId).length === 0;
    const isProdNotOnSelectedList = !products.selected.includes(prodId);

    return prodOnlyOnCurrentRecipe && isProdNotOnSelectedList;
  } else {
    // from selected, need to check if the prod is in any recipe
    const prodOnlyOnCurrentRecipe =
      products.byId[prodId] && products.byId[prodId].recipes.length === 0;

    return prodOnlyOnCurrentRecipe;
  }
}
