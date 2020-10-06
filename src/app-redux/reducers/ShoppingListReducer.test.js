import reducer from "./ShoppingListReducer";
import {
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  prodInSelectedAndRecipe,
} from "./mock-data/ShoppingListData";
import {
  ADD_SIMPLE_PRODUCT,
  ADD_PRODS_RECIPE,
} from "app-redux/actions/ShoppingListAction";

describe("Shopping list reducer", () => {
  it("add first product", () => {
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prodId: "p_01",
        checked: false,
      },
    };
    const expected = test1.expected;
    const result = reducer(test1.state, action);
    expect(result.products).toEqual(expected.products);
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

    expect(reducer(test4.state, action)).toEqual(test4.expected);
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

    const newShopList = reducer(state, action);

    expect(newShopList.products).toEqual(expected.products);
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

  it("Add simple prod when the same belongs to a recipe", () => {
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "drink",
        prodId: "beer",
        checked: false,
      },
    };
    const { expected, state } = prodInSelectedAndRecipe;
    expect(reducer(state, action)).toEqual(expected);
  });
});
