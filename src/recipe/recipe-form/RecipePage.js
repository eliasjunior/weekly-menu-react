import React from "react";
import CategoryList from "inventory/category/components";
import RecipeBtns from "./RecipeBtns";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { recipeUpdateCurrent } from "app-redux/actions/RecipeAction";
import { loadProductsToRecipe } from "../RecipeHelper";
import { loadProductsToCategory } from "inventory/helpers/InventoryHelper";
import RecipeForm from "./RecipeForm";
import { setPageTitle, setPageLocation } from "app-redux/actions/PageAction";
import { parentComponent } from "common/AppConstant";

function RecipePage({ match }) {
  const dispatch = useDispatch();
  //TODO improve performance
  const tempCategories = useSelector((state) => state.categories, shallowEqual);
  const recipes = useSelector((state) => state.recipes, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);

  const categories = loadProductsToCategory(tempCategories, products);
  const recipesWithProducts = loadProductsToRecipe(recipes, products);
  const recipe = getRecipeFromUrl(match, recipesWithProducts);

  dispatch(recipeUpdateCurrent(recipe));
  dispatch(setPageTitle(recipe.id ? "Edit Recipe" : "New Recipe"));
  dispatch(setPageLocation(parentComponent.RECIPE_PAGE));
  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplatList(categories));

  return (
    <CommonErrorBoundary>
      <RecipeForm prevName={recipe.name}></RecipeForm>
      <RecipeBtns></RecipeBtns>
      <CategoryList></CategoryList>
    </CommonErrorBoundary>
  );
}
export default RecipePage;

function getRecipeFromUrl(match = {}, recipes) {
  const { params = {} } = match;
  const { id } = params;

  const rec = recipes.find((rec) => parseInt(rec.id, 10) === parseInt(id, 10));
  return rec ? rec : { name: "" };
}
