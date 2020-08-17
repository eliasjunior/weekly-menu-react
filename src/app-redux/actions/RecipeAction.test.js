import { LOAD_RECIPE_SELECTED, UpdateCurrentRecipe } from "./RecipeAction";

describe("RecipeActions", () => {
  it("basics", () => {
    const expectedAction = {
      type: LOAD_RECIPE_SELECTED,
      payload: {
        name: "BatmanMobile",
        id: "rec_99",
        products: [
          {
            name: "tyres",
            id: "prod_1",
          },
        ],
        prodsDetail: [
          {
            id: "detail_1",
          },
        ],
      },
    };
    const payload = {
      name: "BatmanMobile",
      id: "rec_99",
      products: [
        {
          name: "tyres",
          id: "prod_1",
        },
      ],
      prodsDetail: [
        {
          id: "detail_1",
        },
      ],
    };
    const result = UpdateCurrentRecipe(payload);
    expect(result.type).toEqual(LOAD_RECIPE_SELECTED);
    expect(result.payload.products).toEqual(expectedAction.payload.products);
    expect(result.payload.prodsDetail).toEqual(
      expectedAction.payload.prodsDetail
    );
  });

  it("should return what if products are not correct ?", () => {
    const payload = {
      name: "Joker",
      prodsDetail: {},
    };
    expect(UpdateCurrentRecipe(payload)).toEqual(undefined);

    expect(
      UpdateCurrentRecipe({
        name: "Joker",
        prodsDetail: [],
        products: {},
      })
    ).toEqual(undefined);
  });
});
