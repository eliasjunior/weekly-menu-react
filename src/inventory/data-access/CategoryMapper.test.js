const { categoryConverter } = require("./CategoryMapper");

describe("CategoryMapper.test", () => {
  it("should convert existing category", () => {
    const category = {
      name: "goes",
      id: "coco",
      catProds: [{}],
    };
    const result = categoryConverter(category);
    expect(result).toBeDefined();
    expect(result.name).toEqual(category.name);
    expect(result.catProds).toEqual([{}]);
  });
  it("should convert existing category when detailId is null", () => {
    const category = {
      name: "goes",
      id: "coco",
      catProds: [{}],
    };
    const result = categoryConverter(category);
    expect(result).toBeDefined();
    expect(result.name).toEqual(category.name);
    expect(result.catProds).toEqual([{}]);
  });
  it("should convert new  category when detailId is null", () => {
    const category = {
      name: "goes",
      catProds: [{}],
    };
    const result = categoryConverter(category, true);
    expect(result).toBeDefined();
    expect(result.id).not.toEqual(null);
    expect(result.catProds).toEqual([{}]);
  });
});
