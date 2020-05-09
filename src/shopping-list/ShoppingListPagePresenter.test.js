import { buildShopListPayload } from "./ShoppingListPagePresenter";

describe("ShoppingPagePresenter", () => {
  it("should build the shopping list payload", () => {
    const products = {
      byId: {
        prod_01: {
          id: "prod_01",
          recipes: [14],
        },
        prod_02: {
          id: "prod_02",
        },
      },
      selected: ["prod_01"],
    };
    const payload = buildShopListPayload(products);

    const expected = {
      productsMap: {
        prod_01: {
          id: "prod_01",
          recipes: [14],
          selected: true,
        },
        prod_02: {
          id: "prod_02",
          selected: false,
          recipes: [],
        },
      },
    };

    expect(payload).toEqual(expected);
  });
});
