import { requiredParameter, isEmpty, isNumber, toNumber } from "common/Util";

export function fillRecipesProducts(recipes, productMap) {
  if (productMap.allIds.length === 0) {
    return [];
  }
  const { byId, allIds = [] } = recipes;
  return allIds.reduce((prev, recId) => {
    const recipe = byId[recId];
    recipe.products = recipe.prodsDetail.map(({ id }) => productMap.byId[id]);
    prev.push(recipe);
    return prev;
  }, []);
}

export function sanitizeRecipe({ recipe, isThrow = true, isNew = false }) {
  const { id, name, prodsDetail } = recipe;
  if (!isNew && isEmpty(id)) {
    if (isThrow) {
      requiredParameter("id recipe");
    } else {
      tempNotThrown("id recipe");
    }
  }

  if (isEmpty(name)) {
    if (isThrow) {
      requiredParameter("name recipe");
    } else {
      tempNotThrown("name recipe");
    }
  }
  if (isEmpty(prodsDetail)) {
    if (isThrow) {
      requiredParameter("prodsDetail");
    } else {
      tempNotThrown("prodsDetail");
    }
  } else {
    // detailId cannot be required because when update recipe it can be null
    prodsDetail.forEach(({ id, quantity }) => {
      if (isEmpty(id)) {
        requiredParameter(`Prod id, from ${name}`);
      } else if (!isNumber(quantity)) {
        if (isNumber(toNumber(quantity))) {
          requiredParameter(`quantity, from ${name} is not a valid number`);
        } else {
          requiredParameter(`quantity, from ${name}`);
        }
      }
    });
  }
}

function tempNotThrown(name) {
  console.error(`${name} is required`);
}
