import { SET_FILTER_NAME, inventoryFilter } from "./ListFilterAction";

describe("actions visibility filter", () => {
  it("should filter the display category", () => {
    const expectedAction = {
      type: SET_FILTER_NAME,
      textFilter: "ba"
    };

    expect(inventoryFilter("ba")).toEqual(expectedAction);
  });
});
