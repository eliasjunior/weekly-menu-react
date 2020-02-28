import reducer from "./InventoryFilterReducer";
import { SET_FILTER_NAME } from "../actions/InventoryFilterAction";

describe("Visibility filter", () => {
  it("should not throw an error", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it("should filter base on the text filter passed", () => {
    const categories = [
      {
        name: "Baking",
        products: [{ name: "flour" }]
      },
      {
        name: "Fruits",
        products: [{ name: "Oranges" }, { name: "Berries" }]
      }
    ];

    const resultState = reducer([], {
      type: SET_FILTER_NAME,
      categories,
      textFilter: "Or"
    });
    const { catsFilter } = resultState;
    expect(categories.length).toEqual(2);
    expect(categories[0].products.length).toEqual(1);
    expect(categories[1].products.length).toEqual(2);

    expect(catsFilter.length).toEqual(1);
    expect(catsFilter[0].name).toEqual("Fruits");
    expect(catsFilter[0].products.length).toEqual(1);
    expect(catsFilter[0].products[0].name).toEqual("Oranges");
  });
});
