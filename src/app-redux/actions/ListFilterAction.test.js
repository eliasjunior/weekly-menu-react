import { SET_FILTER_NAME, listFilterAction } from "./ListFilterAction";

describe("ListFilterAction", () => {
  it("should filter the display category", () => {
    const expectedAction = {
      type: SET_FILTER_NAME,
      payload: { textFilter: "ba" },
    };

    expect(listFilterAction("ba")).toEqual(expectedAction);
  });
});
