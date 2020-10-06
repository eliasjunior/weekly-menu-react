import reducer from "./RecipeReducer";
import { UPDATE_CURRENT_RECIPE } from "app-redux/actions/RecipeAction";
describe("Recipe Reducer", () => {
  it("should update current recipe", () => {
    const action = {
      type: UPDATE_CURRENT_RECIPE,
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
