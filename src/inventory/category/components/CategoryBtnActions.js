import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FormDialog from "../../FormDialog";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { useDispatch } from "react-redux";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";

function CategoryActions({ category }) {
  const [catName, setCatName] = useState("");
  const [displayCat, setCatDisplay] = useState(false);

  const [prodName, setProdName] = useState("");
  const [displayProd, setProdDisplay] = useState(false);

  const dispatch = useDispatch();

  const openDialogProduct = () => {
    setProdDisplay(true);
  };
  const openDialogCategory = () => {
    setCatDisplay(true);
  };
  const handleSaveProduct = async () => {
    const newProduct = {
      completed: false,
      quantity: 1,
      name: prodName,
      checked: false
    };
    category.products.push(newProduct);
    await dispatch(updateCategoryAsync(category));
    setProdDisplay(false);
  };
  const handleUpdateCategory = async () => {
    category.name = catName;
    await dispatch(updateCategoryAsync(category));
    setCatDisplay(false);
  };
  return (
    <ListItemSecondaryAction>
      <FormDialog
        form={{
          placeHolder: "Category name",
          value: category.name
        }}
        title={"Update Category"}
        onDisplay={displayCat}
        onChangeName={e => setCatName(e.target.value)}
        onClose={() => setCatDisplay(false)}
        onActionMethod={handleUpdateCategory}
      ></FormDialog>
      <FormDialog
        form={{
          placeHolder: "Product name"
        }}
        title={"New Product"}
        onDisplay={displayProd}
        onChangeName={e => setProdName(e.target.value)}
        onClose={() => setProdDisplay(false)}
        onActionMethod={handleSaveProduct}
      ></FormDialog>
      <Button color="primary" onClick={openDialogCategory}>
        Edit
      </Button>
      <Button color="primary" onClick={openDialogProduct}>
        New Product
      </Button>
    </ListItemSecondaryAction>
  );
}
export default CategoryActions;
