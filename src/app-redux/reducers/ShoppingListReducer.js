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
      return normalizeCatProd({
        state,
        catId,
        prodId,
        checked: payload.checked,
      });
    case ADD_PRODS_RECIPE:
      const { recId, prods } = payload;

      return prods.reduce((prev, { id, catId }) => {
        prev = normalizeProdRecipe({
          state: prev,
          recId,
          catId,
          prodId: id,
          checked: payload.checked,
        });
        return prev;
      }, state);
    default:
      return state;
  }
}

// TODO move to use case or helper

function normalizeCatProd({ state, catId, prodId, checked }) {
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

function normalizeProdRecipe({ state, recId, catId, prodId, checked }) {
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
