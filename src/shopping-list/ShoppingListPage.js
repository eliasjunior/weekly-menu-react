import React from "react";
import CloneDeep from "lodash.clonedeep";
import ShoppingCreateBtns from "./ShoppingCreateBtns";
import CommonErrorBoundary from "../error-handlers/CommonErrorBoundary";
import { useSelector, useDispatch } from "react-redux";
import { setPageTitle, setPageLocation } from "app-redux/actions/PageAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CategoryList from "inventory/category/components";
import TickedShopList from "./TickedShopList";

import TopBtns from "./TopBtns";
import {
  buildShoppingListDisplay,
  mergeRecipeProducts,
} from "shopping-list/helpers/ShoppingHelper";
import {
  quantitiesSelector,
  productMapSelector,
  categoriesSelector,
} from "app-redux/selectors/ShoppingSelector";
import { formShoppingAction } from "app-redux/actions/ProductFormAction";
import { normalizeCategory } from "inventory/helpers/InventoryHelper";
import { parentComponent } from "common/AppConstant";

function ShoppingListPage() {
  const dispatch = useDispatch();

  const quantities = useSelector(quantitiesSelector);
  const productMap = CloneDeep(useSelector(productMapSelector));
  const categories = CloneDeep(useSelector(categoriesSelector));
  const recipeMap = useSelector((state) => state.recipes);
  const shoppingListMap = useSelector((state) => state.shoppingList);
  const title = shoppingListMap.name
    ? shoppingListMap.name
    : "New Shopping list";

  const tempShops = buildShoppingListDisplay({
    quantities,
    productMap: CloneDeep(productMap),
    categoryMap: CloneDeep(normalizeCategory(categories)),
    shoppingListMap,
  });

  const listDisplay = mergeRecipeProducts(recipeMap, tempShops);

  dispatch(setDisplatList(listDisplay));
  dispatch(setPageLocation(parentComponent.SHOPPING_LIST_PAGE));
  dispatch(formShoppingAction());
  dispatch(setPageTitle(title));

  return (
    <CommonErrorBoundary>
      <TopBtns list={listDisplay}></TopBtns>
      <ShoppingCreateBtns></ShoppingCreateBtns>
      <CategoryList></CategoryList>
      <TickedShopList></TickedShopList>
    </CommonErrorBoundary>
  );
}

export default ShoppingListPage;
