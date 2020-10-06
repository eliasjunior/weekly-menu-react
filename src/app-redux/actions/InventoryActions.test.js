import {
  updateCategory,
  UPDATE_CAT,
  FETCH_CATS,
  fetchCategory,
} from "./InventoryActions";

describe("actions", () => {
  it("should create an action to update a category", () => {
    const category = {
      name: "Baking",
    };
    const expectedAction = {
      type: UPDATE_CAT,
      payload: {
        category,
      },
    };
    expect(updateCategory(category)).toEqual(expectedAction);
  });

  it("should create an action to fetch categories", () => {
    const categories = [
      {
        name: "Baking",
      },
      {
        name: "Drinks",
      },
    ];

    const expectedAction = {
      type: FETCH_CATS,
      payload: {
        categories: [
          {
            name: "Baking",
          },
          {
            name: "Drinks",
          },
        ],
      },
    };
    expect(fetchCategory(categories)).toEqual(expectedAction);
  });
});
