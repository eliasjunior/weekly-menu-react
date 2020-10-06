import React from "react";
import CategoryList from "inventory/category/components";
import RecipeFabBtns from "./RecipeFabBtns";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { fillRecipesProducts } from "../RecipeHelper";
import { loadProductsToCategory } from "inventory/helpers/InventoryHelper";
import RecipeForm from "./RecipeForm";
import { setPageLocation } from "app-redux/actions/PageAction";
import { parentComponent } from "common/AppConstant";
import {
  initEditDispatch,
  initNewDispatch,
  getRecipeFromUrl,
} from "./RecipePage.presenter";

function RecipePage({ match }) {
  const dispatch = useDispatch();
  //TODO improve performance
  const tempCategories = useSelector((state) => state.categories, shallowEqual);
  const recipes = useSelector((state) => state.recipes, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);

  const categories = loadProductsToCategory(tempCategories, products);
  const recipesWithProducts = fillRecipesProducts(recipes, products);
  const recipe = getRecipeFromUrl(match, recipesWithProducts);

  // When refresh the page some reducers are called multiples times with different values given unexpected values
  if (recipe.id) {
    initEditDispatch({ dispatch, recipe });
  } else {
    initNewDispatch({ dispatch, productMap: products });
  }

  dispatch(setPageLocation(parentComponent.RECIPE_PAGE));
  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplatList(categories));

  return (
    <CommonErrorBoundary>
      <RecipeForm prevName={recipe.name}></RecipeForm>
      <RecipeFabBtns></RecipeFabBtns>
      <CategoryList></CategoryList>
    </CommonErrorBoundary>
  );
}
export default RecipePage;
