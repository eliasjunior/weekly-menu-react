import TickedHelper from "./TickedHelper";

describe("TickedHelper", () => {
  it("filter products that has alreadt been picked", () => {
    const { filterByPicked } = TickedHelper({ getDeepCopy: (list) => list });
    const listOfProducts = [
      { products: [{ picked: true }, { picked: true }, { picked: false }] },
    ];
    const result = filterByPicked({ displayList: listOfProducts });
    expect(result[0].products.length).toEqual(2);
  });
  it("Should return [] when it a empty list ", () => {
    const { filterByPicked } = TickedHelper({ getDeepCopy: (list) => list });
    const listOfProducts = [];
    const result = filterByPicked({ displayList: listOfProducts });
    expect(result.length).toEqual(0);
  });
  it("Should return [] when the category has no products ", () => {
    const { filterByPicked } = TickedHelper({ getDeepCopy: (list) => list });
    const listOfProducts = [{ name: "someCat", products: [] }];
    const result = filterByPicked({ displayList: listOfProducts });
    expect(result.length).toEqual(0);
  });
});
