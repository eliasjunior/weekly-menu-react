import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import CategoryList from "./category/components";
import { AppWeekBar } from "../header/AppWeekBar";
import FormDialog from "./FormDialog";
import { Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CommmonStyles from "../styles/CommonStyles";
import AddIcon from "@material-ui/icons/Add";
import SearchName from "components/SearchName";
import { createCategoryAsync } from "app-redux/actions/InventoryActions";
import CategoryDisplayHelper from "inventory/category/services/CategoryDisplayService";
import { formViewAction } from "app-redux/actions/ProductFormAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { setDisplatList } from "app-redux/actions/ListFilterAction";

//TODO need to change searchInput(display the component or not) and CategoryDisplayService names are misleading
const { filterInputVisibility } = CategoryDisplayHelper;

function InventoryPage(props) {
  const [catName, setCatName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  //TODO review here categotyList also subscribes
  const categories = useSelector(state => state.categories, shallowEqual);

  const dispatch = useDispatch();
  dispatch(setDisplatList(categories));
  dispatch(formViewAction());

  const { classes } = props;
  const handleChangeName = ev => {
    setCatName(ev.target.value);
  };
  const saveCategory = () => {
    const category = {
      name: catName
    };
    dispatch(createCategoryAsync(category));
    setOpenModal(false);
  };
  let dialogProps = {
    open: openModal,
    isUpdate: false,
    title: "Create Category",
    form: {
      placeHolder: "Category name",
      value: "",
      onActionMethod: saveCategory
    }
  };

  const displayFilterInput = () => {
    return filterInputVisibility("InventoryPage").display ? (
      <SearchName listDB={categories}></SearchName>
    ) : (
      ""
    );
  };

  return (
    <CommonErrorBoundary>
      <AppWeekBar title="Product List"></AppWeekBar>
      {displayFilterInput()}
      <CategoryList></CategoryList>
      <Fab
        color="primary"
        className={classes.floatingBtn}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <AddIcon />
      </Fab>
      <FormDialog
        form={{}}
        onDisplay={false}
        dialogProps={dialogProps}
        onChangeName={handleChangeName}
        onCloseDialog={() => setOpenModal(false)}
      ></FormDialog>
    </CommonErrorBoundary>
  );
}
export default withStyles(CommmonStyles)(InventoryPage);
