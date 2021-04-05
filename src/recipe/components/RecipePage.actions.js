import { setPageTitle } from "app-redux/actions/PageAction";
import {
  addAllSelectedProduct,
  resetSelectedProduct,
} from "app-redux/actions/ProductSelectionAction";
import { updateCurrentRecipe } from "app-redux/actions/RecipeAction";
import { addAllQtd, resetQty } from "app-redux/actions/QuantityPickAction";
import { quantityMapperProdsDetail, requiredParameter } from "common/Util";
import {
  createRecipeAsync,
  updateRecipeAsync,
} from "app-redux/actions/RecipeCrudActions";
import { isRecipeFormValid } from "../recipe-form/FormValidation";

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
  justNewProdAdded = false,
}) {
  dispatch(setPageTitle("New Recipe"));
  if (!justNewProdAdded) {
    dispatch(resetSelectedProduct());
    dispatch(resetQty(productMap));
  }
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

export async function handleSave({
  dispatch,
  currentRecipe = requiredParameter("currentRecipe"),
  selectedProducts,
  prodsDetail,
}) {
  const { name } = currentRecipe;
  if (isRecipeFormValid({ name, dispatch, selectedProducts })) {
    const recipePayload = mapperRecipeView({ name, prodsDetail });
    await dispatch(createRecipeAsync(recipePayload));
  }
}

export async function handleUpdate({
  dispatch,
  currentRecipe = requiredParameter("currentRecipe"),
  selectedProducts,
  prodsDetail,
}) {
  const { name, id } = currentRecipe;
  if (isRecipeFormValid({ name, dispatch, selectedProducts })) {
    const recipePayload = mapperRecipeView({ name, prodsDetail, id });
    await dispatch(updateRecipeAsync(recipePayload));
  }
}

// private
function mapperRecipeView({ name, prodsDetail, id }) {
  if (id) {
    return {
      id,
      name,
      prodsDetail,
    };
  } else {
    return {
      name,
      prodsDetail,
    };
  }
}
