import React from "react";
import CloneDeep from "lodash.clonedeep";
import ShoppingCreateActions from "./ShoppingCreateActions";
import CommonErrorBoundary from "../error-handlers/CommonErrorBoundary";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
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
} from "./ShoppingHelper";
import { formShoppingAction } from "app-redux/actions/ProductFormAction";

function ShoppingListPage() {
  const dispatch = useDispatch();

  const selectedProducts = useSelector(pickedProdsSelector);
  const quantities = useSelector(quantitiesSelector);
  const productMap = useSelector(productMapSelector);
  const categoriesDB = useSelector(categoriesSelector);

  //filter products based on the select
  const chosenProducts = loadChosenProducts({
    selectedProducts,
    quantities,
    productMap,
  });
  const categories = loadChosenCategories({
    categoriesDB: CloneDeep(categoriesDB),
    chosenProducts,
  });

  dispatch(setDisplatList(categories));

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
