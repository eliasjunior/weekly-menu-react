import reducer from "./ShoppingListReducer";
import {
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
} from "./mock-data/ShoppingListData";
import {
  ADD_SIMPLE_PRODUCT,
  ADD_PRODS_RECIPE,
} from "app-redux/actions/ShoppingListAction";

//TODO add quantity ?, not sure

describe("Shopping list reducer", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      categories: { byId: {} },
      products: { byId: {}, selected: [] },
      recipes: { byId: {} },
    };
  });

  it("add first product", () => {
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prodId: "p_01",
      },
    };
    const expected = test1.expected;
    const result = reducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it("add second product", () => {
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prodId: "p_02",
      },
    };

    const { state, expected } = test2;

    expect(reducer(state, action)).toEqual(expected);
  });

  it("remove first product", () => {
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prodId: "p_01",
        checked: true,
      },
    };
    const { expected, state } = test3;
    expect(reducer(state, action)).toEqual(expected);
  });

  it("Add special products from recipe", () => {
    const action = {
      type: ADD_PRODS_RECIPE,
      payload: {
        prods: [
          { id: "p_01", catId: "c_02" },
          { id: "p_03", catId: "c_04" },
        ],
        recId: "r_01",
      },
    };

    expect(reducer(undefined, action)).toEqual(test4.expected);
  });

  it("Add special products from recipe with existing selected products", () => {
    const action = {
      type: ADD_PRODS_RECIPE,
      payload: {
        prods: [
          { id: "p_01", catId: "c_02" },
          { id: "p_03", catId: "c_04" },
        ],
        recId: "r_01",
      },
    };

    const { expected, state } = test5;

    expect(reducer(state, action)).toEqual(expected);
  });

  it("Remove recipe with existing selected products", () => {
    const action = {
      type: ADD_PRODS_RECIPE,
      payload: {
        prods: [
          { id: "p_01", catId: "c_02" },
          { id: "p_03", catId: "c_04" },
        ],
        recId: "r_01",
        checked: true,
      },
    };
    const { expected, state } = test6;
    expect(reducer(state, action)).toEqual(expected);
  });
});
