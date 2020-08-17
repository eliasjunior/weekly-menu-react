import reducer from "./RecipeReducer";
import { LOAD_RECIPE_SELECTED } from "app-redux/actions/RecipeAction";
describe("Recipe Reducer", () => {
  it("should update current recipe", () => {
    const action = {
      type: LOAD_RECIPE_SELECTED,
      payload: {
        id: "1",
        name: "Carrot Cake",
      },
    };
    expect(reducer(undefined, action)).toEqual({
      id: "1",
      name: "Carrot Cake",
    });
  });
});
