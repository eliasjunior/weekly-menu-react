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
  loadProductsChosenRecipes,
  addRecipeProductsToCategory,
} from "./ShoppingHelper";
import {
  pickedProdsSelector,
  quantitiesSelector,
  productMapSelector,
  categoriesSelector,
} from "app-redux/selectors/ShoppingSelector";
import { formShoppingAction } from "app-redux/actions/ProductFormAction";

function ShoppingListPage() {
  const dispatch = useDispatch();

  //const selectedProducts = useSelector(pickedProdsSelector);
  // const selectedRecIds = useSelector((state) => state.selectedRecIds);

  const quantities = useSelector(quantitiesSelector);
  const productMap = CloneDeep(useSelector(productMapSelector));
  const categories = CloneDeep(useSelector(categoriesSelector));

  //TODO review this
  const recipeMap = useSelector((state) => state.recipes);
  //const selectedRecipes = selectedRecIds.map((id) => recipes.byId[id]);

  //filter products based on the select
  // const chosenProducts = loadChosenProducts({
  //   selectedProducts,
  //   quantities,
  //   productMap,
  // });

  // const productSetChosenRecipes = loadProductsChosenRecipes({
  //   productMap,
  //   categories,
  //   selectedRecipes,
  // });

  // const catsWithProdsSelected = loadChosenCategories({
  //   categories,
  //   productSetChosenRecipes,
  //   chosenProducts,
  // });

  // const mergedCategories = addRecipeProductsToCategory({
  //   catsWithProdsSelected,
  //   productSetChosenRecipes,
  //   categoriesDB: categories,
  // });

  // dispatch(setDisplatList(mergedCategories));
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
