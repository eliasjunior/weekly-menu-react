import React, { useState } from "react";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import ItemSelection from "components/ItemSelection";
import Quantity from "components/Quantity";
import QuantityBtnInfo from "components/QuantityBtnInfo";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import Restore from "@material-ui/icons/Restore";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { successMessage } from "app-redux/actions/AlertHandlerAction";
import {
  formEditAction,
  formViewAction,
  BTN_SHOPPING_SELECTION,
  FORM_VIEW_EDIT, // form_view refer to the primary text field from the ListItem
  FORM_VIEW_LABEL,
  BTN_EDIT_MODE, // secondary btns
  BTN_VIEW_MODE,
  BTN_SELECTION,
  BTN_PICK_PROD,
  BTN_QDT_INFO,
} from "app-redux/actions/ProductFormAction";
import { updateProductAsync } from "app-redux/actions/ProductAction";
import ShoppingItemSelection from "components/ShoppingItemSelection";

function ComponentCatalog({ product }) {
  const dispatch = useDispatch();

  const [name, setName] = useState(product.name);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const restoreButton = () => {
    return (
      <IconButton
        aria-label="Comments"
        onClick={() => dispatch(formViewAction())}
      >
        <Restore></Restore>
      </IconButton>
    );
  };

  const deleteButton = () => {
    return (
      <IconButton
        aria-label="Comments"
        onClick={() => dispatch(successMessage("not ready!"))}
      >
        <DeleteIcon style={styles.deleteIcon}></DeleteIcon>
      </IconButton>
    );
  };
  return function (key) {
    switch (key) {
      case BTN_SELECTION:
        return (
          <ItemSelection key="ItemSelection" product={product}></ItemSelection>
        );
      case FORM_VIEW_EDIT:
        return (
          <TextField
            key={"TextField"}
            onChange={handleChangeName}
            defaultValue={name}
          ></TextField>
        );
      case FORM_VIEW_LABEL:
        return (
          <ListItemText key={"ListItemText"} primary={name}></ListItemText>
        );
      case BTN_EDIT_MODE:
        return (
          <ListItemSecondaryAction key={"ListItemSecondaryAction_1"}>
            <IconButton
              aria-label="Comments"
              onClick={() => {
                product.name = name;
                dispatch(updateProductAsync(product));
                dispatch(formViewAction());
              }}
            >
              <SaveIcon style={styles.saveIcon} />
            </IconButton>
            {restoreButton()}
            {deleteButton()}
          </ListItemSecondaryAction>
        );
      case BTN_VIEW_MODE:
        return (
          <ListItemSecondaryAction key={"ListItemSecondaryAction_2"}>
            <IconButton
              aria-label="Comments"
              onClick={() => dispatch(formEditAction())}
            >
              <CreateIcon style={styles.editIcon} />
            </IconButton>
            {restoreButton()}
            {deleteButton()}
          </ListItemSecondaryAction>
        );
      case BTN_PICK_PROD:
        return (
          <Quantity
            key={"Quantity"}
            prodId={product.id}
            type={product.quantityType}
            quantityDefault={product.quantityDefault}
          ></Quantity>
        );
      case BTN_QDT_INFO: //TODO change name
        return (
          <div key={"ListItemText"}>
            <ListItemText
              primary={name}
              style={product.picked ? styles.textItemListTicked : {}}
            ></ListItemText>
            <QuantityBtnInfo
              key={"QuantityBtnInfo"}
              {...product}
            ></QuantityBtnInfo>
          </div>
        );
      case BTN_SHOPPING_SELECTION:
        return (
          <ShoppingItemSelection
            key="ShoppingItemSelection"
            product={product}
          ></ShoppingItemSelection>
        );
      default:
        return "";
    }
  };
}

export default ComponentCatalog;
