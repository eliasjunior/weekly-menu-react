import {
  buildShopListPayload,
  normalizeCatShopHistory,
  normalizeProdShopHistory,
  normalizeRecipeShopHistory,
} from "shopping-list/presenter";

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
    const APIs = {
      timeAPI: {
        getTimeLabel: "Today",
      },
    };
    const payload = buildShopListPayload({ products }, APIs);

    const expected = {
      name: "Today",
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
  describe("Normalizing Shopping history", () => {
    it("should build category shoppingList from history", () => {
      const productMap = {
        byId: {
          prod_0: {
            catId: "cat01",
          },
          prod_1: {
            catId: "cat01",
          },
          prod_2: {
            catId: "cat02",
          },
        },
      };
      const shoppingHistory = {
        name: "Thu May 14 2020 23:20:49",
        products: [
          {
            id: "prod_0",
            recipes: [],
            selected: true,
          },
          {
            id: "prod_1",
            recipes: [13],
            selected: false,
          },
          {
            id: "prod_2",
            recipes: [13],
            selected: false,
          },
        ],
        _id: 4,
      };
      const categories = normalizeCatShopHistory({
        productMap,
        shoppingHistory,
      });
      const expected = {
        categories: {
          byId: {
            cat01: { id: "cat01", prods: ["prod_0", "prod_1"] },
            cat02: { id: "cat02", prods: ["prod_2"] },
          },
        },
      };
      expect(categories).toEqual(expected);
    });

    it("should build product shoppingList from history ", () => {
      const shoppingHistory = {
        name: "Thu May 14 2020 23:20:49",
        products: [
          {
            id: "pid_1",
            recipes: [1, 2],
            selected: true,
          },
          {
            id: "pid_2",
            recipes: [1],
            selected: false,
          },
        ],
      };

      const expected = {
        products: {
          byId: {
            pid_1: { id: "pid_1", recipes: [1, 2] },
            pid_2: { id: "pid_2", recipes: [1] },
          },
          selected: ["pid_1"],
        },
      };

      const result = normalizeProdShopHistory(shoppingHistory);

      expect(result).toEqual(expected);
    });

    it("should build recipe shoppingList from history ", () => {
      const shoppingHistory = {
        name: "Thu May 14 2020 23:20:49",
        products: [
          {
            id: "pid_1",
            recipes: ["r_1", "r_2"],
            selected: true,
          },
          {
            id: "pid_2",
            recipes: ["r_1"],
            selected: false,
          },
        ],
      };

      const expected = {
        recipes: {
          byId: {
            r_1: { id: "r_1" },
            r_2: { id: "r_2" },
          },
        },
      };

      const result = normalizeRecipeShopHistory(shoppingHistory);

      expect(result).toEqual(expected);
    });
  });
});
