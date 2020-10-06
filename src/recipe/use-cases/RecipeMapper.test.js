import { recipeConverter } from "./RecipeMapper";

describe("RecipeMapper.test", () => {
  it("should convert existing recipe recipeConverter", () => {
    const recipe = {
      name: "goes",
      id: "coco",
      prodsDetail: [{ detailId: "xx", id: "ew", quantity: 100 }],
    };
    const result = recipeConverter(recipe);
    expect(result).toBeDefined();
  });
  it("should convert existing recipe when detailId is null", () => {
    const recipe = {
      name: "goes",
      id: "coco",
      prodsDetail: [{ id: "ew", quantity: 100 }],
    };
    const result = recipeConverter(recipe);
    expect(result).toBeDefined();
  });
  it("should convert new  recipe when detailId is null", () => {
    const recipe = {
      name: "goes",
      prodsDetail: [{ id: "ew", quantity: 100 }],
    };
    const result = recipeConverter(recipe, true);
    expect(result).toBeDefined();
  });
});
