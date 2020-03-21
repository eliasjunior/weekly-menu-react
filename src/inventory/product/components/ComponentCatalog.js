import React, { useState } from "react";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import ItemSelection from "components/ItemSelection";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { successMessage } from "app-redux/actions/AlertHandlerAction";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";
import { formEditAction } from "app-redux/actions/ProductFormAction";
import {
  FORM_VIEW_EDIT,
  FORM_VIEW_LABEL,
  BTN_EDIT_MODE,
  BTN_VIEW_MODE,
  BTN_SELECTION
} from "app-redux/actions/ProductFormAction";

import Presenter from "inventory/presenter";
const { updateProductInCategory } = Presenter;

export default function({ category, product }) {
  const [name, setName] = useState(product.name);

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const dispatch = useDispatch();
  const deleteButton = () => {
    return (
      <IconButton aria-label="Comments">
        <DeleteIcon
          style={styles.deleteIcon}
          onClick={() => dispatch(successMessage("not ready!"))}
        ></DeleteIcon>
      </IconButton>
    );
  };
  return function(key) {
    switch (key) {
      case BTN_SELECTION:
        return (
          <ItemSelection
            key="ItemSelection"
            checked={"false"}
            name={product.name}
            prodId={product.id}
          ></ItemSelection>
        );
      case FORM_VIEW_EDIT:
        return (
          <TextField
            key={"TextField"}
            onChange={handleChangeName}
            defaultValue={product.name}
          ></TextField>
        );
      case FORM_VIEW_LABEL:
        return (
          <ListItemText key={"ListItemText"} primary={name}></ListItemText>
        );
      case BTN_EDIT_MODE:
        return (
          <ListItemSecondaryAction key={"ListItemSecondaryAction_1"}>
            <IconButton aria-label="Comments">
              <SaveIcon
                style={styles.saveIcon}
                onClick={() => {
                  product.name = name;
                  const newCat = updateProductInCategory(category, product);
                  dispatch(updateCategoryAsync(newCat));
                }}
              />
            </IconButton>
            {deleteButton()}
          </ListItemSecondaryAction>
        );
      case BTN_VIEW_MODE:
        return (
          <ListItemSecondaryAction key={"ListItemSecondaryAction_2"}>
            <IconButton aria-label="Comments">
              <CreateIcon
                style={styles.editIcon}
                onClick={() => dispatch(formEditAction())}
              />
            </IconButton>
            {deleteButton()}
          </ListItemSecondaryAction>
        );
    }
  };
}
