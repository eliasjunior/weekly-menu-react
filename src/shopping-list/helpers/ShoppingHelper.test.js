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
    const expected = `10 ${UNIT_LABEL}`;
    expect(productDisplay.quantityDisplay).toEqual(expected);
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
    const expected = `1 ${UNIT_LABEL}`;
    expect(productDisplay.quantityDisplay).toEqual(expected);
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
            quantityDisplay: `10 ${WEIGHT_LABEL}`,
            quantityType: WEIGHT_TYPE,
          },
          {
            name: "Flour",
            id: "flour",
            recipes: ["cake"],
            quantity: 2,
            quantityType: WEIGHT_TYPE,
            selected: true,
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
    const expected_1 = `10 ${WEIGHT_LABEL}`;
    expect(sugar.quantityDisplay).toEqual(expected_1);
    expect(sugar.quantity).toEqual(10);
    const expected_2 = `202 ${WEIGHT_LABEL}`;
    expect(flour.quantityDisplay).toEqual(expected_2);
  });
  it("Merge Recipe Products, quantity of recipe", () => {
    const catsDiplay = [
      {
        name: "catme",
        products: [
          {
            name: "Sugar",
            id: "sugar",
            recipes: ["bolo"],
            quantity: 1,
            quantityDisplay: `1 ${WEIGHT_LABEL}`,
            quantityType: WEIGHT_TYPE,
          },
        ],
      },
    ];
    const recipes = {
      byId: {
        bolo: {
          id: "bolo",
          prodsDetail: [{ id: "sugar", quantity: 3 }],
        },
      },
    };

    const newCats = mergeRecipeProducts(recipes, catsDiplay);

    const sugar = newCats[0].products.filter((p) => p.name === "Sugar").pop();
    const expected_1 = `3 ${WEIGHT_LABEL}`;
    expect(sugar.quantityDisplay).toEqual(expected_1);
    expect(sugar.quantity).toEqual(3);
  });
  //TODO add more test, selected prods and recipes
});
