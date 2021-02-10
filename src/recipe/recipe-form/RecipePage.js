import React, {useEffect, useRef} from "react";
import CategoryList from "inventory/category/components";
import RecipeFabBtns from "./RecipeFabBtns";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {formSelectionAction} from "app-redux/actions/ProductFormAction";
import {setDisplayList} from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import {fillRecipesProducts} from "../RecipeHelper";
import {loadProductsToCategory} from "inventory/helpers/InventoryHelper";
import RecipeForm from "./RecipeForm";
import {setPageLocation} from "app-redux/actions/PageAction";
import {parentComponent} from "common/AppConstant";
import {getRecipeFromUrl, initEditDispatch, initNewDispatch,} from "./RecipePage.presenter";
import SearchName from "components/SearchName";

function RecipePage({match}) {
  const prevProdLengthRef = useRef();
  const dispatch = useDispatch();
  //TODO improve performance
  const tempCategories = useSelector((state) => state.categories, shallowEqual);
  const recipes = useSelector((state) => state.recipes);
  const products = useSelector((state) => state.products, shallowEqual);

  useEffect(() => {
    prevProdLengthRef.current = products.allIds.length;
  });

  const categories = loadProductsToCategory(tempCategories, products);
  const recipe = getRecipeFromUrl(match, fillRecipesProducts(recipes, products));
  // When refresh the page some reducers are called multiples times with different values given unexpected values
  if (recipe.id) {
    initEditDispatch({dispatch, recipe});
  } else {
    // Still when it saves it loses the checks, need a why to pass the recipe.id ? the code
    // above does gets updated when the new recipe gets created
    const isNotReset = prevProdLengthRef.current !== products.allIds.length;
    initNewDispatch({
      dispatch,
      productMap: products,
      justNewProdAdded: isNotReset
    });
  }

  dispatch(setPageLocation(parentComponent.RECIPE_PAGE));
  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplayList(categories));

  return (
    <CommonErrorBoundary>
      <SearchName listDB={categories}></SearchName>
      <RecipeForm prevName={recipe.name}></RecipeForm>
      <RecipeFabBtns></RecipeFabBtns>
      <CategoryList></CategoryList>
    </CommonErrorBoundary>
  );
}

export default RecipePage;
