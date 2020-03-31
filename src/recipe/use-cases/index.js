import ApiService from "service/ApiService";

export default {
  getRecipes: async () => {
    try {
      const data = await ApiService.get("recipes");
      return recipeListMapper(data);
    } catch (error) {
      throw error;
    }
  },
  saveRecipeAsync: async recipe => {
    try {
      const data = await ApiService.post("recipes", recipeConverter(recipe));
      return recipeMapper(data);
    } catch (error) {
      throw error;
    }
  },
  updateRecipeAsync: async recipe => {
    try {
      const data = await ApiService.put("recipes", recipeConverter(recipe));
      return recipeMapper(data);
    } catch (error) {
      throw error;
    }
  },
  getRecipeAsync: async id => {
    try {
      const data = await ApiService.get("recipes/" + id);
      return recipeMapper(data);
    } catch (error) {
      throw error;
    }
  }
};

export function recipeListMapper(list) {
  return list.map(cat => recipeMapper(cat));
}
export function recipeMapper(recipeResponse) {
  return {
    id: recipeResponse._id,
    name: recipeResponse.name,
    products: recipeResponse.products.map(({ _id, name }) => ({
      id: _id,
      name
    }))
  };
}

export function recipeConverter({ id, products, name }) {
  return {
    _id: id,
    name,
    products: products.map(({ id, name }) => ({
      _id: id,
      name
    }))
  };
}
