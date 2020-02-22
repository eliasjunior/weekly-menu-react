import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FormDialog from "./FormDialog";
import ProductService from "./product/ProductService";
import CategoryService from "./category/CategoryService";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

function CategoryActions(props) {
  const [catName, setCatName] = useState("");
  const [displayCat, setCatDisplay] = useState(false);

  const [prodName, setProdName] = useState("");
  const [displayProd, setProdDisplay] = useState(false);

  const openDialogProduct = () => {
    setProdDisplay(true);
  };
  const openDialogCategory = () => {
    setCatDisplay(true);
  };
  const saveProduct = () => {
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
  const updateCategory = () => {
    props.category.name = catName;
    CategoryService.update(props.category)
      .then(() => {
        props.onHandleMessage({
          message: "Uhhuu Category saved",
          type: "success"
        });
        setCatDisplay(false);
        // props.onRefresh(); call get cat
      })
      .catch(reason => props.onHandleMessage({ message: reason.message }));
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
        onActionMethod={updateCategory}
      ></FormDialog>
      <FormDialog
        form={{
          placeHolder: "Product name"
        }}
        title={"New Product"}
        onDisplay={displayProd}
        onChangeName={e => setProdName(e.target.value)}
        onClose={() => setProdDisplay(false)}
        onActionMethod={saveProduct}
      ></FormDialog>
      <Button color="primary" onClick={() => openDialogCategory()}>
        Edit
      </Button>
      <Button color="primary" onClick={() => openDialogProduct()}>
        New Product
      </Button>
    </ListItemSecondaryAction>
  );
}
export default CategoryActions;
