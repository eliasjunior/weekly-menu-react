import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FormDialog from "../../FormDialog";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { useDispatch } from "react-redux";
import { createProductAsync } from "app-redux/actions/ProductAction";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";

//TODO Reminder, need to add saveProduct to ProductAction or InventoryAction ? second one is getting bigger,

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
      name: prodName,
      catId: category.id,
    };
    await dispatch(createProductAsync(newProduct, category));
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
          value: category.name,
        }}
        title={"Update Category"}
        isToUpdate={true}
        onDisplay={displayCat}
        onChangeName={(e) => setCatName(e.target.value)}
        onClose={() => setCatDisplay(false)}
        onActionMethod={handleUpdateCategory}
      ></FormDialog>
      <FormDialog
        form={{
          placeHolder: "Product name",
        }}
        title={"New Product"}
        onDisplay={displayProd}
        onChangeName={(e) => setProdName(e.target.value)}
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
