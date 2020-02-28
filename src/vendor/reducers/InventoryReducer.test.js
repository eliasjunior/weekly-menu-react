import InventoryReducer from "./inventoryReducer";
import { UPDATE_CAT } from "../actions/inventoryActions";

describe("Inventory reducers", () => {
  it("should return the initial state", () => {
    expect(InventoryReducer(undefined, {})).toEqual([]);
  });

  it("should handle update categories ", () => {
    const action = {
      type: UPDATE_CAT,
      category: {
        name: "Baking",
        _id: 1
      }
    };
    const categories = [
      {
        name: "Baking Pownder",
        _id: 1,
        products: [
          {
            name: "Sugar"
          }
        ]
      },
      {
        name: "Drinks",
        _id: 2
      }
    ];
    expect(InventoryReducer(categories, action)).toEqual([
      {
        name: "Baking",
        _id: 1
      },
      {
        name: "Drinks",
        _id: 2
      }
    ]);
  });
});
