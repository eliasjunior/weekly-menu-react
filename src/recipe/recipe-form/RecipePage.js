import React from "react";
import CategoryList from "inventory/category/components";
import RecipeBtns from "./RecipeBtns";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { fillRecipesProducts } from "../RecipeHelper";
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
  const recipesWithProducts = fillRecipesProducts(recipes, products);
  const recipe = getRecipeFromUrl(match, recipesWithProducts);
  if (recipe.id) {
    dispatch(setPageTitle("Edit Recipe"));
  } else {
    dispatch(setPageTitle("New Recipe"));
  }

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
  const rec = recipes.find((rec) => {
    if (rec.id && id) {
      return rec.id.toString() === id.toString();
    }
    return false;
  });
  return rec ? rec : { name: "" };
}
