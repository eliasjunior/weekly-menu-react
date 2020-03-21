import reducer from "./RecipeReducer";
import { RECIPE_CHECK_CLICK } from "app-redux/actions/RecipeAction";
describe("Recipe Reducer", () => {
  it("return recipe prod list ", () => {
    const payload = {
      checked: true,
      prodId: "1"
    };
    const action = {
      type: RECIPE_CHECK_CLICK,
      payload
    };
    expect(reducer([], action)).toEqual([payload]);
  });
});
