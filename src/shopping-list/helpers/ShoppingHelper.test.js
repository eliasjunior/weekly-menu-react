import { setProductQty, mergeRecipeProducts } from "./ShoppingHelper";
import {
  UNIT_TYPE,
  UNIT_LABEL,
  WEIGHT_TYPE,
  WEIGHT_LABEL,
} from "inventory/product/Constant";

describe("ShoppingHelper", () => {
  it("Set the product quantity", () => {
    const product = {
      id: "beer",
      quantityDefault: 1,
      quantityType: UNIT_TYPE,
    };
    const quantities = {
      beer: 10,
    };
    const productDisplay = setProductQty(product, quantities);
    expect(productDisplay.quantityDisplay).toEqual("10" + " " + UNIT_LABEL);
  });
  it("Set the product quantity default", () => {
    const product = {
      id: "beer",
      quantityDefault: 1,
      quantityType: UNIT_TYPE,
    };
    const quantities = {
      water: 10,
    };
    const productDisplay = setProductQty(product, quantities);
    expect(productDisplay.quantityDisplay).toEqual("1" + " " + UNIT_LABEL);
  });
  it("Merge Recipe Products", () => {
    const catsDiplay = [
      {
        name: "catme",
        products: [
          {
            name: "Sugar",
            id: "sugar",
            recipes: [],
            quantity: 10,
            quantityDisplay: "10" + " " + WEIGHT_LABEL,
            quantityType: WEIGHT_TYPE,
          },
          {
            name: "Flour",
            id: "flour",
            recipes: ["cake"],
            quantity: 2,
            quantityType: WEIGHT_TYPE,
          },
        ],
      },
    ];
    const recipes = {
      byId: {
        cake: {
          id: "cake",
          prodsDetail: [{ id: "flour", quantity: 200 }],
        },
      },
    };

    const newCats = mergeRecipeProducts(recipes, catsDiplay);

    expect(newCats.length).toBe(1);
    expect(newCats[0].products.length).toBe(2);

    const sugar = newCats[0].products.filter((p) => p.name === "Sugar").pop();
    const flour = newCats[0].products.filter((p) => p.name === "Flour").pop();
    expect(sugar.quantityDisplay).toEqual("10" + " " + WEIGHT_LABEL);
    expect(sugar.quantity).toEqual(10);
    expect(flour.quantityDisplay).toEqual("202" + " " + WEIGHT_LABEL);
  });
});
