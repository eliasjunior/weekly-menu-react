import reducer from "./RecipeReducer";
import { RECIPE_UPDATE_CURRENT } from "app-redux/actions/RecipeAction";
describe("Recipe Reducer", () => {
  it("should update current recipe", () => {
    const action = {
      type: RECIPE_UPDATE_CURRENT,
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
