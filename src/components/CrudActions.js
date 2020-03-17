import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { green, red } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import Presenter from "inventory/presenter";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";
import { useDispatch } from "react-redux";
const { updateProductInCategory } = Presenter;

const styles = {
  saveIcon: {
    color: green[400]
  },
  editIcon: {
    color: green[400]
  },
  deleteIcon: {
    color: red[500]
  }
};
export const CrudActions = props => {
  const dispatch = useDispatch();
  const displaySaveOrEditIcon = () => {
    return props.editFieldMode ? (
      <SaveIcon
        style={styles.saveIcon}
        onClick={() => {
          const newCat = updateProductInCategory(props.category, props.product);
          dispatch(updateCategoryAsync(newCat));
        }}
      />
    ) : (
      <CreateIcon style={styles.editIcon} onClick={() => props.swapIcon()} />
    );
  };

  const buttons = (
    <div>
      <IconButton aria-label="Comments">{displaySaveOrEditIcon()}</IconButton>
      <IconButton aria-label="Comments">
        <DeleteIcon
          style={styles.deleteIcon}
          onClick={() => props.deleteItem()}
        ></DeleteIcon>
      </IconButton>
    </div>
  );
  return buttons;
};
