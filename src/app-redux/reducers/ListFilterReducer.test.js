import reducer from "./ListFilterReducer";
import { SET_FILTER_NAME } from "../actions/ListFilterAction";

describe("Visibility filter", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      displayList: [],
      payload: { textFilter: "", listDB: [] },
    });
  });
  it("should filter base on the text filter passed", () => {
    const categories = [
      {
        name: "Baking",
        products: [{ name: "flour" }],
      },
      {
        name: "Fruits",
        products: [{ name: "oranges" }, { name: "Berries" }],
      },
    ];

    const resultState = reducer(undefined, {
      type: SET_FILTER_NAME,
      payload: { textFilter: "Or", listDB: categories },
    });

    expect(resultState).toBeDefined();
    expect(resultState.textFilter).toEqual("Or");
    expect(resultState.displayList.length).toEqual(1);
    expect(resultState.displayList[0].products[0].name).toEqual("Oranges");
  });

  it("should also filter by category name", () => {
    const categories = [
      {
        name: "Baking",
        products: [{ name: "flour" }],
      },
      {
        name: "Fruits",
        products: [{ name: "oranges" }, { name: "Berries" }],
      },
    ];

    const resultState = reducer(undefined, {
      type: SET_FILTER_NAME,
      payload: { textFilter: "Bak", listDB: categories },
    });

    expect(resultState).toBeDefined();
    expect(resultState.textFilter).toEqual("Bak");
    expect(resultState.displayList.length).toEqual(1);
    expect(resultState.displayList[0].name).toEqual("Baking");
  })
});
