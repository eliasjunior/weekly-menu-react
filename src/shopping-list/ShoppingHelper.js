import { requiredParameter } from "common/Util";

export function buildShoppingListDisplay({
  quantities,
  shoppingListMap,
  categoryMap,
  productMap,
  recipeMap,
}) {
  const { categories } = shoppingListMap;
  return Object.keys(categories.byId).reduce((prev, catId) => {
    const catValue = categories.byId[catId];
    const { name, id } = categoryMap.byId[catId];

    const buildProduct = (prodId) => {
      const {
        name,
        id,
        catId,
        quantityDefault,
        quantityType,
      } = productMap.byId[prodId];
      return {
        name,
        id,
        catId,
        quantityDefault,
        quantityType,
      };
    };

    const setProductQty = (prodQty) => {
      const { quantityDefault, quantityType } = prodQty;
      const result = getQuantity({
        quantity: quantities[prodQty.id],
        quantityDefault,
        quantityType,
      });
      prodQty.quantityDisplay = result;
      return prodQty;
    };

    const addRecipeProds = (prod) => {
      const prodWithRec = shoppingListMap.products.byId[prod.id];

      if (prodWithRec.recipes) {
        const { recTotal, recDisplay } = prodWithRec.recipes.reduce(
          (prev, recId) => {
            const { prodsDetail, name } = recipeMap.byId[recId];

            const detail = prodsDetail
              .filter((detail) => detail.id === prod.id)
              .pop();

            if (!detail) {
              requiredParameter("detail");
            }
            prev.recTotal += detail.quantity;
            prev.recDisplay += name + ", ";

            return prev;
          },
          { recTotal: 0, recDisplay: "" }
        );
        console.log("recDisplay", recDisplay);
        prod.quantity = prod.quantity + recTotal;
        prod.recDisplay = recDisplay;

        prod.quantityDisplay = getRecipeQuantity({
          quantity: recTotal,
          quantityType: prodWithRec.quantityType,
        });
      }
      return prod;
    };

    const products = catValue.prods
      .map(buildProduct)
      .map(setProductQty)
      .map(addRecipeProds);

    prev.push({
      name,
      id,
      products,
    });

    return prev;
  }, []);
}

function getQuantity({ quantity, quantityType, quantityDefault }) {
  const label = quantityType === "UNIT" ? "u" : "g";
  if (!quantity) {
    return quantityDefault + " " + label;
  } else {
    return quantity + " " + label;
  }
}

function getRecipeQuantity({ quantity, quantityType }) {
  const label = quantityType === "UNIT" ? "u" : "g";
  return quantity + " " + label;
}
