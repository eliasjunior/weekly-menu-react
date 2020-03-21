import ApiService from "service/ApiService";

export default {
  getRecipes: () => ApiService.get("recipes"),
  saveRecipeAsync: recipe => ApiService.post("recipes", recipe),
  updateRecipeAsync: recipe => ApiService.put("recipes", recipe),
  getRecipeAsync: id => ApiService.get("recipes/" + id)
};
