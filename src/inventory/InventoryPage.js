import React, { useState, useEffect } from "react";
import CategoryList from "./category/category-list/components";
import { AppWeekBar } from "../common/AppWeekBar";
import FormDialog from "./FormDialog";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CommmonStyles from "../styles/CommonStyles";
import AddIcon from "@material-ui/icons/Add";
import Presenter from "./presenter";

const { getCategories, save } = Presenter;

function InventoryPage(props) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchCat() {
      setCategories(await getCategories());
    }
    fetchCat();
  }, []);

  const onChangeName = ev => {
    setName(ev.target.value);
  };
  const saveCategory = () => {
    const category = {
      name
    };
    save(category)
      .then(() => {
        props.onHandleMessage({
          message: "Uhhuu Category saved",
          type: "success"
        });
        closeDialog();
        //refresh(); use Effect ?
      })
      .catch(reason => props.onHandleMessage({ message: reason.message }));
  };
  let dialogProps = {
    open: false,
    isUpdate: false,
    title: "Create Category",
    form: {
      placeHolder: "Category name",
      value: "",
      onActionMethod: saveCategory
    }
  };
  const closeDialog = () => {
    const dialogProps = { ...dialogProps };
    dialogProps.open = false;
    //setDialogProps(dialogProps);
  };
  const { classes } = props;
  return (
    <div>
      <AppWeekBar title="Product List"></AppWeekBar>
      <CategoryList
        list={categories}
        parentComponent="InventoryPage"
        onHandleMessage={props.onHandleMessage}
      ></CategoryList>
      <Button
        color="primary"
        variant="fab"
        className={classes.floatingBtn}
        onClick={() => {
          dialogProps.open = true;
        }}
      >
        <AddIcon />
      </Button>
      <FormDialog
        dialogProps={dialogProps}
        onChangeName={onChangeName}
        onCloseDialog={closeDialog}
      ></FormDialog>
    </div>
  );
}
export default withStyles(CommmonStyles)(InventoryPage);
