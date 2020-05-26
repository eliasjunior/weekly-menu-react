export const test1 = {
  state: {
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_01"],
        },
      },
    },
    products: {
      byId: {
        p_01: {
          id: "p_01",
        },
      },
      selected: [],
    },
    recipes: {
      byId: {},
    },
  },
  expected: {
    id: undefined,
    name: undefined,
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_01"],
        },
      },
    },
    products: {
      byId: {
        p_01: {
          id: "p_01",
        },
      },
      selected: ["p_01"],
    },
    recipes: { byId: {} },
  },
};

export const test2 = {
  state: {
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_01"],
        },
      },
    },
    products: {
      byId: {
        p_01: {
          id: "p_01",
        },
      },
      selected: ["p_01"],
    },
    recipes: {
      byId: {},
    },
  },
  expected: {
    id: undefined,
    name: undefined,
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_01", "p_02"],
        },
      },
    },
    products: {
      byId: {
        p_01: {
          id: "p_01",
        },
        p_02: {
          id: "p_02",
          recipes: [],
        },
      },
      selected: ["p_01", "p_02"],
    },
    recipes: {
      byId: {},
    },
  },
};

export const test3 = {
  state: {
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_01", "p_02"],
        },
      },
    },
    products: {
      byId: {
        p_01: {
          id: "p_01",
        },
        p_02: {
          id: "p_02",
        },
      },
      selected: ["p_01", "p_02"],
    },
  },
  expected: {
    id: undefined,
    name: undefined,
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_02"],
        },
      },
    },
    products: {
      byId: {
        p_02: {
          id: "p_02",
        },
      },
      selected: ["p_02"],
    },
  },
};

export const test4 = {
  state: {
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
        },
        p_03: {
          id: "p_03",
        },
      },
      selected: [],
    },
    recipes: { byId: {} },
  },
  expected: {
    id: undefined,
    name: undefined,
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
  },
};

export const test5 = {
  state: {
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
        },
        p_02: {
          id: "p_02",
        },
        p_03: {
          id: "p_03",
        },
      },
      selected: ["p_01", "p_02"],
    },
    recipes: {
      byId: {},
    },
  },
  expected: {
    id: undefined,
    name: undefined,
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
        p_02: {
          id: "p_02",
        },
        p_03: {
          id: "p_03",
          recipes: ["r_01"],
        },
      },
      selected: ["p_01", "p_02"],
    },
    recipes: {
      byId: {
        r_01: { id: "r_01" },
      },
    },
  },
};

export const test6 = {
  state: {
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
        p_02: {
          id: "p_02",
        },
        p_03: {
          id: "p_03",
          recipes: ["r_01"],
        },
      },
      selected: ["p_01", "p_02"],
    },
    recipes: {
      byId: {
        r_01: { id: "r_01" },
      },
    },
  },
  expected: {
    id: undefined,
    name: undefined,
    categories: {
      byId: {
        c_02: {
          id: "c_02",
          prods: ["p_01", "p_02"],
        },
      },
    },
    products: {
      byId: {
        p_01: {
          id: "p_01",
          recipes: [],
        },
        p_02: {
          id: "p_02",
        },
      },
      selected: ["p_01", "p_02"],
    },
    recipes: {
      byId: {},
    },
  },
};

export const prodInSelectedAndRecipe = {
  state: {
    categories: {
      byId: {
        drink: {
          id: "drink",
          prods: ["beer"],
        },
      },
    },
    products: {
      byId: {
        beer: {
          id: "beer",
          recipes: ["caseira"],
        },
      },
      selected: [],
    },
    recipes: {
      byId: {
        caseira: { id: "caseira" },
      },
    },
  },
  expected: {
    id: undefined,
    name: undefined,
    categories: {
      byId: {
        drink: {
          id: "drink",
          prods: ["beer"],
        },
      },
    },
    products: {
      byId: {
        beer: {
          id: "beer",
          recipes: ["caseira"],
        },
      },
      selected: ["beer"],
    },
    recipes: {
      byId: {
        caseira: { id: "caseira" },
      },
    },
  },
};
