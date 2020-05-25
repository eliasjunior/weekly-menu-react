import React, { useState } from "react";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import ItemSelection from "components/ItemSelection";
import Quantity from "components/Quantity";
import QuantityBtnInfo from "components/QuantityBtnInfo";
import CreateIcon from "@material-ui/icons/Create";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { successMessage } from "app-redux/actions/AlertHandlerAction";
import FormDialogProduct from "inventory/FormDialogProduct";
import { isProdFormValid } from "inventory/product/FormValidation";
import {
  BTN_SHOPPING_SELECTION,
  PROD_LABEL,
  BTN_SELECTION,
  BTN_PICK_PROD,
  BTN_QDT_INFO,
  BTN_CRUD,
} from "app-redux/actions/ProductFormAction";
import { updateProductAsync } from "app-redux/actions/ProductAction";
import ShoppingItemSelection from "components/ShoppingItemSelection";

function ComponentCatalog({ product }) {
  const dispatch = useDispatch();

  const [displayProdDialog, setProdDialog] = useState(false);

  const renderModal = () => {
    return (
      <FormDialogProduct
        form={{
          placeHolder: "Product name",
          name: product.name,
          quantityType: product.quantityType,
        }}
        title={"Update Product"}
        onDisplay={displayProdDialog}
        onClose={() => setProdDialog(false)}
        onActionMethod={({ name, quantityType }) => {
          if (isProdFormValid({ name, dispatch })) {
            product.name = name;
            product.quantityType = quantityType;
            dispatch(updateProductAsync(product));
            setProdDialog(false);
          }
        }}
      ></FormDialogProduct>
    );
  };

  return function (key) {
    switch (key) {
      case BTN_SELECTION:
        return (
          <ItemSelection key="ItemSelection" product={product}></ItemSelection>
        );
      case PROD_LABEL:
        return (
          <ListItemText
            key={"ListItemText"}
            primary={product.name}
          ></ListItemText>
        );
      case BTN_CRUD:
        return (
          <div key="crud">
            <ListItemSecondaryAction key={"ListItemSecondaryAction_1"}>
              <IconButton
                aria-label="Comments"
                onClick={() => {
                  setProdDialog(true);
                }}
              >
                <CreateIcon style={styles.saveIcon} />
              </IconButton>
              <IconButton
                aria-label="Comments"
                onClick={() => dispatch(successMessage("not ready!"))}
              >
                <DeleteIcon style={styles.deleteIcon}></DeleteIcon>
              </IconButton>
            </ListItemSecondaryAction>
            {renderModal()}
          </div>
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
      case BTN_QDT_INFO:
        return (
          <div key={"ListItemText"}>
            <ListItemText
              primary={product.name}
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
