import React from "react";
import CloneDeep from "lodash.clonedeep";
import ShoppingCreateActions from "./ShoppingCreateActions";
import CommonErrorBoundary from "../error-handlers/CommonErrorBoundary";
import { useSelector, useDispatch } from "react-redux";
import { setPageTitle } from "app-redux/actions/PageAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CategoryList from "inventory/category/components";
import {
  loadChosenProducts,
  loadChosenCategories,
  pickedProdsSelector,
  quantitiesSelector,
  productMapSelector,
  categoriesSelector,
  loadProductsChosenRecipes,
  addRecipeProductsToCategory,
} from "./ShoppingHelper";
import { formShoppingAction } from "app-redux/actions/ProductFormAction";

function ShoppingListPage() {
  const dispatch = useDispatch();

  const selectedProducts = useSelector(pickedProdsSelector);
  const selectedRecIds = useSelector((state) => state.selectedRecIds);

  const quantities = useSelector(quantitiesSelector);
  const productMap = useSelector(productMapSelector);
  const categories = useSelector(categoriesSelector);

  //TODO review this
  const recipes = useSelector((state) => state.recipes);
  const selectedRecipes = selectedRecIds.map((id) => recipes.byId[id]);

  //filter products based on the select
  const chosenProducts = loadChosenProducts({
    selectedProducts,
    quantities,
    productMap,
  });

  const productSetChosenRecipes = loadProductsChosenRecipes({
    productMap,
    categories,
    selectedRecipes,
  });

  const catsWithProdsSelected = loadChosenCategories({
    categories: CloneDeep(categories),
    productSetChosenRecipes,
    chosenProducts,
  });

  const mergedCategories = addRecipeProductsToCategory({
    catsWithProdsSelected,
    productSetChosenRecipes,
    categoriesDB: CloneDeep(categories),
  });

  dispatch(setDisplatList(mergedCategories));
  dispatch(formShoppingAction());
  dispatch(setPageTitle("New Shopping list"));

  return (
    <div>
      <CommonErrorBoundary>
        <ShoppingCreateActions></ShoppingCreateActions>
        <CategoryList></CategoryList>
      </CommonErrorBoundary>
    </div>
  );
}

export default ShoppingListPage;
