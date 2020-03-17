import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import CategoryList from "./category/components";
import { AppWeekBar } from "../header/AppWeekBar";
import FormDialog from "./FormDialog";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CommmonStyles from "../styles/CommonStyles";
import AddIcon from "@material-ui/icons/Add";
import Presenter from "./presenter";
import SearchName from "components/SearchName";
import { fetchCategoryAsync } from "app-redux/actions/InventoryActions";
import CategoryDisplayHelper from "inventory/category/services/CategoryDisplayService";
import { formViewAction } from "app-redux/actions/FormProductAction";
import ErrorBoundaryInventory from "error-handlers/ErrorBoundaryComponent";
import ErrorBoundary from "error-handlers/ErrorBoundaryComponent";

//TODO need to change searchInput(display the component or not) and CategoryDisplayService names are misleading
const { filterInputVisibility } = CategoryDisplayHelper;

const { save } = Presenter;

function InventoryPage(props) {
  const [catName, setCatName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { categories } = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    async function asyncFetch() {
      dispatch(fetchCategoryAsync());
      dispatch(formViewAction());
    }
    asyncFetch();
  }, []);
  const { classes } = props;
  const handleChangeName = ev => {
    setCatName(ev.target.value);
  };
  const saveCategory = () => {
    const category = {
      catName
    };
    //await dispatch(saveCategoryAsync(category));
    save(category)
      .then(() => {
        // props.onHandleMessage({
        //   message: "Uhhuu Category saved",
        //   type: "success"
        // });
        //refresh(); use Effect ?
        setOpenModal(false);
      })
      .catch(reason => props.onHandleMessage({ message: reason.message }));
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
      <SearchName displayList={categories}></SearchName>
    ) : (
      ""
    );
  };

  return (
    <ErrorBoundary>
      <AppWeekBar title="Product List"></AppWeekBar>
      {displayFilterInput()}
      <CategoryList parentComponent="InventoryPage"></CategoryList>
      <Button
        color="primary"
        variant="fab"
        className={classes.floatingBtn}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <AddIcon />
      </Button>
      <FormDialog
        form={{}}
        onDisplay={false}
        dialogProps={dialogProps}
        onChangeName={handleChangeName}
        onCloseDialog={() => setOpenModal(false)}
      ></FormDialog>
    </ErrorBoundary>
  );
}
export default withStyles(CommmonStyles)(InventoryPage);
