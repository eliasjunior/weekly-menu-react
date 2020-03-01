import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FormDialog from "../../FormDialog";
import ProductService from "../../product/service/ProductService";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { useDispatch } from "react-redux";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";

function CategoryActions(props) {
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
  const handleSaveProduct = () => {
    props.category.products.push({
      completed: false,
      quantity: 1,
      name: prodName,
      checked: false
    });

    ProductService.save(props.category)
      .then(() => {
        props.onHandleMessage({
          message: "Uhhuu Product saved",
          type: "success"
        });
        setProdDisplay(false);
        // props.onRefresh(); call get cat
      })
      .catch(reason => props.onHandleMessage({ message: reason.message }));
  };
  const handleUpdateCategory = async () => {
    props.category.name = catName;
    try {
      const result = await dispatch(updateCategoryAsync(props.category));
      if (result.error) {
        // move these to another layer, error handle
        props.onHandleMessage({ message: result.error.message });
        return;
      }

      props.onHandleMessage({
        message: "Uhhuu Category saved",
        type: "success"
      });
      setCatDisplay(false);
    } catch (error) {
      props.onHandleMessage({ message: error.message });
    }
  };
  return (
    <ListItemSecondaryAction>
      <FormDialog
        form={{
          placeHolder: "Category name",
          value: props.category.name
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
