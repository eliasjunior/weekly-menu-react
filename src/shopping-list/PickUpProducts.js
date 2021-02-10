import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import CategoryList from "inventory/category/components/CategoryList";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { formPickAction } from "app-redux/actions/ProductFormAction";
import { loadProductsToCategory } from "inventory/helpers/InventoryHelper";
import { setPageTitle, setPageLocation } from "app-redux/actions/PageAction";
import { setDisplayList } from "app-redux/actions/ListFilterAction";
import SearchName from "components/SearchName";
import Done from "@material-ui/icons/Done";
import { withStyles, Fab } from "@material-ui/core";
import CommmonStyles from "../styles/CommonStyles";
import { LOCATION } from "common/AppConstant";
import { Link } from "react-router-dom";

function PickUpProducts({ classes }) {
  const dispatch = useDispatch();
  const combinedClasses = `${classes.floatingBtn}`;
  const { newShoppingList, pickProducts } = LOCATION;

  const tempCategories = useSelector((state) => state.categories, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);
  const catsWithProducts = loadProductsToCategory(tempCategories, products);

  dispatch(setDisplayList(catsWithProducts));

  dispatch(setPageTitle("Pick products"));
  dispatch(setPageLocation(pickProducts.label));
  dispatch(formPickAction());

  return (
    <CommonErrorBoundary>
      <SearchName listDB={catsWithProducts}></SearchName>
      <CategoryList></CategoryList>
      <div className={combinedClasses}>
        <Fab color="secondary">
          <Link to={newShoppingList.path}>
            <Done />
          </Link>
        </Fab>
      </div>
    </CommonErrorBoundary>
  );
}

export default withStyles(CommmonStyles)(PickUpProducts);
