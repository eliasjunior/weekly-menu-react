import reducer from "./ShoppingListReducer";
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
    };
  });

  it("add first product", () => {
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prod: { id: "p_01" },
      },
    };

    const expected = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01"],
          },
        },
      },
      products: { byId: {}, selected: [] },
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it("add second product", () => {
    const state = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01"],
          },
        },
      },
      products: { byId: {}, selected: ["p_01"] },
    };
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prod: { id: "p_02" },
      },
    };

    const expected = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01", "p_02"],
          },
        },
      },
      products: { byId: {}, selected: ["p_01", "p_02"] },
    };
    expect(reducer(state, action)).toEqual(expected);
  });

  it("remove first product", () => {
    const state = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01", "p_02"],
          },
        },
      },
      products: { byId: {}, selected: ["p_01", "p_02"] },
    };
    const action = {
      type: ADD_SIMPLE_PRODUCT,
      payload: {
        catId: "c_02",
        prod: { id: "p_01" },
      },
    };

    const expected = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_02"],
          },
        },
      },
      products: { byId: {}, selected: ["p_02"] },
    };
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

    const expected = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01"],
          },
          c_04: {
            id: "c_04",
            prods: ["p_03"],
          },
        },
      },
      products: {
        byId: {
          p_01: {
            id: "p_01",
            recipes: ["r_01"],
          },
          p_03: {
            id: "p_03",
            recipes: ["r_01"],
          },
        },
        selected: [],
      },
      recipes: {
        byId: {
          r_01: { id: "r_01" },
        },
      },
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });

  //TODO need to fix here, have to pass selected
  it("Add special products from recipe with existing selected products", () => {
    const state = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01", "p_02"],
          },
        },
      },
      products: { byId: {}, selected: ["p_01", "p_02"] },
    };
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

    const expected = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01", "p_02"],
          },
          c_04: {
            id: "c_04",
            prods: ["p_03"],
          },
        },
      },
      products: {
        byId: {
          p_01: {
            id: "p_01",
            recipes: ["r_01"],
          },
          p_03: {
            id: "p_03",
            recipes: ["r_01"],
          },
        },
        selected: ["p_01", "p_02"],
      },
    };
    expect(reducer(state, action)).toEqual(expected);
  });

  it("Remove recipe with existing selected products", () => {
    const state = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01", "p_02"],
          },
          c_04: {
            id: "c_04",
            prods: ["p_03"],
          },
        },
      },
      products: {
        byId: {
          p_01: {
            id: "p_01",
            recipes: ["r_01"],
          },
          p_03: {
            id: "p_03",
            recipes: ["r_01"],
          },
        },
        selected: ["p_01", "p_02"],
      },
    };
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

    const expected = {
      categories: {
        byId: {
          c_02: {
            id: "c_02",
            prods: ["p_01", "p_02"],
          },
        },
      },
      products: {
        byId: {},
        selected: ["p_01", "p_02"],
      },
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
