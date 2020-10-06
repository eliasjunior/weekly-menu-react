import reducer from "./ProductCrudReducer";
import { UPDATE_PRODUCT } from "app-redux/actions/ProductCrudAction";
describe("ProductCrudReducer.test", () => {
  it("should update product quantityDefault", () => {
    const product = {
      id: "12",
      name: "Beer",
      quantityType: "WEIGHT",
      quantityDefault: 1,
      catId: "57ada093-e02e-4cde-b8c5-f4954106604b",
    };
    const state = {
      byId: {
        12: {
          id: 12,
          name: "Beer",
          quantityType: "UNIT",
          quantityDefault: 1,
          catId: "57ada093-e02e-4cde-b8c5-f4954106604b",
        },
      },
      allIds: [],
    };
    const result = reducer(state, {
      payload: { product },
      type: UPDATE_PRODUCT,
    });
    expect(result.byId[12].quantityDefault).toBe(100);
  });
});
