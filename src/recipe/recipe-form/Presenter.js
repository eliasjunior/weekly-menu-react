import { requiredParameter, logService } from "common/Util";
import {
  createRecipeAsync,
  updateRecipeAsync,
} from "app-redux/actions/RecipeCrudActions";
import { isRecipeFormValid } from "./FormValidation";

// presenter function from RecipeFabBtns
export function buildProdDetailsFromSelectedProds({
  selectedProducts = requiredParameter("selectedProducts"),
  productMap = requiredParameter("productMap"),
  currentRecipe = requiredParameter("currentRecipe"),
  quantityMap,
} = {}) {
  if (!productMap.byId) {
    requiredParameter("product byId");
  }
  const existingRecipe = (prev, prodId) => {
    //prodDetail.id is the id of the Product and detailId is the prodDetail id
    const detail = currentRecipe.prodsDetail.find(
      (prodDetail) => prodDetail.id === prodId
    );
    const quantity = quantityMap[prodId];
    if (!quantity) {
      logService("Attemp to read quantity failed");
    }
    //detail CANNOT be null because when updating the prod id is Not in the current Recipe
    prev.push({
      id: prodId,
      detailId: detail ? detail.detailId : null,
      quantity,
    });
    return prev;
  };

  const newRecipe = (prev, id) => {
    const product = productMap.byId[id];

    if (!product) {
      requiredParameter(`product(id=${id})`);
    }
    // the rule is if the product has a recipe this value is in prodDetail table otherwise is in prod table
    let quantity = quantityMap[id];
    if (!quantity) {
      logService("Attemp to read quantity failed");
    }

    prev.push({
      id: product.id,
      quantity,
    });
    return prev;
  };

  if (currentRecipe.id) {
    return selectedProducts.reduce(existingRecipe, []);
  } else {
    return selectedProducts.reduce(newRecipe, []);
  }
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
