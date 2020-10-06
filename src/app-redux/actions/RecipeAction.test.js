import { UPDATE_CURRENT_RECIPE, updateCurrentRecipe } from "./RecipeAction";

describe("RecipeActions", () => {
  it("basics", () => {
    const expectedAction = {
      type: UPDATE_CURRENT_RECIPE,
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
    const result = updateCurrentRecipe(payload);
    expect(result.type).toEqual(UPDATE_CURRENT_RECIPE);
    // expect(result.payload.products).toEqual(expectedAction.payload.products);
    expect(result.payload.prodsDetail).toEqual(
      expectedAction.payload.prodsDetail
    );
  });

  it("should return undefined if products is not array", () => {
    const payload = {
      name: "Joker",
      prodsDetail: {},
    };
    expect(updateCurrentRecipe(payload)).toEqual(undefined);

    // expect(
    //   updateCurrentRecipe({
    //     name: "Joker",
    //     prodsDetail: [],
    //     products: {},
    //   })
    // ).toEqual(undefined);
  });
});
