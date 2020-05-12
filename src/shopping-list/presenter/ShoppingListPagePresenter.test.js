import { buildShopListPayload } from "shopping-list/presenter";

describe("ShoppingListPagePresenter", () => {
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
      products: [
        {
          id: "prod_01",
          recipes: [14],
          selected: true,
        },
        {
          id: "prod_02",
          recipes: [],
          selected: false,
        },
      ],
    };

    expect(payload).toEqual(expected);
  });
});
