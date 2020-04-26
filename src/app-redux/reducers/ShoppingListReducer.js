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
        const isSelected = state.products.selected.includes(prod.id);
        const isRecipe = true;
        // when isSelected=false (false && true = false), means was'nt selected and I can remove
        prev = normalizeCatProd({
          state: prev,
          catId: prod.catId,
          prodId: prod.id,
          isRecipe: isSelected && isRecipe,
        });
        prev = normalizeProdRecipe(prev, recId, prod.id);
        return prev;
      }, state);

    default:
      return state;
  }
}

function normalizeCatProd({ state, catId, prodId, isRecipe = false }) {
  const cat = state.categories.byId[catId];
  const { products, categories } = state;

  if (!cat) {
    categories.byId[catId] = {
      id: catId,
      prods: [prodId],
    };
    products.selected = [prodId];
  } else {
    const hasProd = cat.prods.includes(prodId);

    if (!hasProd) {
      cat.prods = [...cat.prods, prodId];
      products.selected = [...products.selected, prodId];
    } else if (!isRecipe) {
      cat.prods = cat.prods.filter((pId) => pId !== prodId);
      products.selected = products.selected.filter((pId) => pId !== prodId);
      // remove cat if there is not prods
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
    }
  }
  return { ...state, products: { ...products }, recipes: { ...state.recipes } };
}
