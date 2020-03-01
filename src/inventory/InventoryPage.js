import React, { useState } from "react";
import CategoryList from "./category/components";
import { AppWeekBar } from "../header/AppWeekBar";
import FormDialog from "./FormDialog";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CommmonStyles from "../styles/CommonStyles";
import AddIcon from "@material-ui/icons/Add";
import Presenter from "./presenter";

const { save } = Presenter;

function InventoryPage(props) {
  const [catName, setCatName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleChangeName = ev => {
    setCatName(ev.target.value);
  };
  const saveCategory = () => {
    const category = {
      catName
    };
    save(category)
      .then(() => {
        props.onHandleMessage({
          message: "Uhhuu Category saved",
          type: "success"
        });
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
  const { classes } = props;
  return (
    <div>
      <AppWeekBar title="Product List"></AppWeekBar>
      <CategoryList
        parentComponent="InventoryPage"
        onHandleMessage={props.onHandleMessage}
      ></CategoryList>
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
    </div>
  );
}
export default withStyles(CommmonStyles)(InventoryPage);
