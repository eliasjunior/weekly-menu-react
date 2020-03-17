import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { CrudActions } from "components/CrudActions";
import { successMessage } from "app-redux/actions/AlertHandlerAction";
import DisplayService from "inventory/category/services/CategoryDisplayService";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import { requiredParameter } from "common/Util";
import ItemSelection from "common/ItemSelection";

export default function ProductForm({
  parentComponent,
  product = requiredParameter("product"),
  category = requiredParameter("category"),
  onSelectedProd
}) {
  const [name, setName] = useState(product.name);
  const [editFieldMode, setEditFieldMode] = useState(false);
  const dispatch = useDispatch();
  const { formProduct = requiredParameter("formProduct") } = useSelector(
    state => state
  );
  const componentIds = [...formProduct];

  const handleChangeName = e => {
    setName(e.target.value);
  };
  const handleEditBtn = () => {
    setEditFieldMode(!editFieldMode);
  };
  const isActionBtnsDisplay = () => {
    return DisplayService.crudActions(parentComponent).display ? (
      <CrudActions
        deleteItem={() => dispatch(successMessage("not ready!"))}
        editFieldMode={editFieldMode}
        swapIcon={handleEditBtn}
        category={category}
        product={product}
      ></CrudActions>
    ) : (
      ""
    );
  };
  const formComponents = {
    PROD_SELECTION: (
      <ItemSelection
        key="1"
        onChangeSelection={onSelectedProd}
        product={product}
        parent={category}
      ></ItemSelection>
    ),
    FORM_VIEW_EDIT: (
      <TextField
        key="2"
        onChange={handleChangeName}
        defaultValue={name}
      ></TextField>
    ),

    FORM_VIEW_LABEL: <ListItemText key="3" primary={name}></ListItemText>

    // actions: [
    //   <IconButton aria-label="Comments">
    //     <SaveIcon
    //       style={styles.saveIcon}
    //       onClick={() => {
    //         const newCat = updateProductInCategory(
    //           props.category,
    //           props.product
    //         );
    //         dispatch(updateCategoryAsync(newCat));
    //       }}
    //     />
    //   </IconButton>,
    //   <IconButton aria-label="Comments">
    //     <CreateIcon style={styles.editIcon} onClick={() => props.swapIcon()} />
    //   </IconButton>,
    //   <IconButton aria-label="Comments">
    //     <DeleteIcon
    //       style={styles.deleteIcon}
    //       onClick={() => props.deleteItem()}
    //     ></DeleteIcon>
    //   </IconButton>
    // ]
  };
  const buildForm = () => {
    const result = [];

    while (componentIds.length) {
      const currentId = componentIds.shift(); // always remove

      const component = formComponents[currentId]; // search in the catalog

      if (component) {
        result.push(component);
      }
    }
    return result;
  };
  return (
    <div>
      <form>
        {buildForm()}
        <ListItemSecondaryAction>
          {isActionBtnsDisplay()}
        </ListItemSecondaryAction>
      </form>
    </div>
  );
}
