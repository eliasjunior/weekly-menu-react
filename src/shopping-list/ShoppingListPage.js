import React from "react";
import CloneDeep from "lodash.clonedeep";
import ShoppingCreateActions from "./ShoppingCreateActions";
import CommonErrorBoundary from "../error-handlers/CommonErrorBoundary";
import { useSelector, useDispatch } from "react-redux";
import { setPageTitle } from "app-redux/actions/PageAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CategoryList from "inventory/category/components";
import {
  buildShoppingListDisplay,
  mergeRecipeProducts,
} from "./ShoppingHelper";
import {
  quantitiesSelector,
  productMapSelector,
  categoriesSelector,
} from "app-redux/selectors/ShoppingSelector";
import { formShoppingAction } from "app-redux/actions/ProductFormAction";
import { normalizeCategory } from "inventory/helpers/InventoryHelper";

function ShoppingListPage() {
  const dispatch = useDispatch();

  const quantities = useSelector(quantitiesSelector);
  const productMap = CloneDeep(useSelector(productMapSelector));
  const categories = CloneDeep(useSelector(categoriesSelector));
  const recipeMap = useSelector((state) => state.recipes);
  const shoppingListMap = useSelector((state) => state.shoppingList);

  const tempShops = buildShoppingListDisplay({
    quantities,
    productMap: CloneDeep(productMap),
    categoryMap: CloneDeep(normalizeCategory(categories)),
    shoppingListMap,
  });

  const listDisplay = mergeRecipeProducts(recipeMap, tempShops);

  console.log("---", listDisplay);

  dispatch(setDisplatList(listDisplay));
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
