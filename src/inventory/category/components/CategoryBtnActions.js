import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FormDialog from "inventory/FormDialog";
import FormDialogProduct from "inventory/FormDialogProduct";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { useDispatch } from "react-redux";
import { createProductAsync } from "app-redux/actions/ProductCrudAction";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";

function CategoryActions({ category }) {
  const [catName, setCatName] = useState("");
  const [displayCat, setCatDisplay] = useState(false);

  const [displayProd, setProdDisplay] = useState(false);

  const dispatch = useDispatch();

  const openDialogProduct = () => {
    setProdDisplay(true);
  };
  const openDialogCategory = () => {
    setCatDisplay(true);
  };
  const handleSaveProduct = async ({ name, quantityType }) => {
    const newProduct = {
      name,
      quantityType,
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
      <FormDialogProduct
        form={{
          placeHolder: "Product name",
        }}
        title={"New Product"}
        onDisplay={displayProd}
        onClose={() => setProdDisplay(false)}
        onActionMethod={handleSaveProduct}
      ></FormDialogProduct>
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
