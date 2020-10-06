import { setPageTitle } from "app-redux/actions/PageAction";
import {
  addAllSelectedProduct,
  resetSelectedProduct,
} from "app-redux/actions/ProductSelectionAction";
import { updateCurrentRecipe } from "app-redux/actions/RecipeAction";
import { addAllQtd, resetQty } from "app-redux/actions/QuantityPickAction";
import { quantityMapperProdsDetail, requiredParameter } from "common/Util";

export function initEditDispatch({
  dispatch = requiredParameter("dispatch"),
  recipe = requiredParameter("recipe"),
}) {
  const selectedProds = selectedProdViewMapper({ products: recipe.products });
  dispatch(setPageTitle("Edit Recipe"));
  dispatch(addAllSelectedProduct(selectedProds));
  dispatch(updateCurrentRecipe(recipeViewMapper(recipe)));
  dispatch(addAllQtd(quantityMapperProdsDetail(recipe.prodsDetail)));
}

export function initNewDispatch({
  dispatch = requiredParameter("dispatch"),
  productMap = requiredParameter("productMap"),
}) {
  dispatch(setPageTitle("New Recipe"));
  dispatch(resetSelectedProduct());
  dispatch(resetQty(productMap));
}

export function selectedProdViewMapper({
  toggled = true,
  reset = true,
  products = [],
}) {
  return {
    toggled,
    reset,
    prodIds: products.map((prod) => prod.id),
  };
}

export function recipeViewMapper({ name, id, prodsDetail }) {
  return {
    name,
    id,
    prodsDetail,
  };
}

export function getRecipeFromUrl(match = {}, recipes) {
  const { params = {} } = match;
  const { id } = params;
  const rec = recipes.find((rec) => {
    if (rec.id && id) {
      return rec.id.toString() === id.toString();
    }
    return false;
  });
  return rec ? rec : { name: "" };
}
