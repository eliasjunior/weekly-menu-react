import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import CategoryList from "./category/components";
import FormDialog from "../components/FormDialog";
import { Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CommmonStyles from "../styles/CommonStyles";
import AddIcon from "@material-ui/icons/Add";
import SearchName from "components/SearchName";
import { createCategoryAsync, fetchCategoryAsync } from "app-redux/actions/InventoryActions";
import { fetchProductsAsync } from "app-redux/actions/ProductCrudAction";
import CategoryDisplayHelper from "inventory/category/services/CategoryDisplayHelper";
import { formEditAction } from "app-redux/actions/ProductFormAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { setDisplayList } from "app-redux/actions/ListFilterAction";
import { loadProductsToCategory } from "./helpers/InventoryHelper";
import { parentComponent } from "common/AppConstant";
import { setPageLocation, setPageTitle } from "app-redux/actions/PageAction";

//TODO need to change searchInput(display the component or not) and CategoryDisplayService names are misleading
const { filterInputVisibility } = CategoryDisplayHelper;

function InventoryPage({ classes }) {
  const [catName, setCatName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  async function asyncFetch() {
    dispatch(fetchCategoryAsync());
    dispatch(fetchProductsAsync());
  }
  useEffect(() => {
    asyncFetch();
  }, [dispatch]);

  const tempCats = useSelector((state) => state.categories, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);
  const catsWithProducts = loadProductsToCategory(tempCats, products);

  dispatch(setDisplayList(catsWithProducts));
  dispatch(formEditAction());
  dispatch(setPageLocation(parentComponent.INVENTORY_PAGE));
  dispatch(setPageTitle("Products"));

  const handleChangeName = (ev) => {
    setCatName(ev.target.value);
  };
  const saveCategory = () => {
    const category = {
      name: catName,
    };
    dispatch(createCategoryAsync(category));
    setOpenModal(false);
  };
  const displayFilterInput = () => {
    return filterInputVisibility("InventoryPage").display ? (
      <SearchName listDB={catsWithProducts}></SearchName>
    ) : (
      ""
    );
  };

  const displayFabBtn = () => (
    <Fab
      color="primary"
      className={classes.floatingBtn}
      onClick={() => {
        setOpenModal(true);
      }}
    >
      <AddIcon />
    </Fab>
  );

  return (
    <CommonErrorBoundary>
      {displayFilterInput()}
      <CategoryList></CategoryList>
      {displayFabBtn()}
      <FormDialog
        form={{
          placeHolder: "Category name",
          value: "",
        }}
        title="Create Category"
        isToUpdate={false}
        onDisplay={openModal}
        onChangeName={handleChangeName}
        onClose={() => setOpenModal(false)}
        onActionMethod={saveCategory}
      ></FormDialog>
    </CommonErrorBoundary>
  );
}
export default withStyles(CommmonStyles)(InventoryPage);
