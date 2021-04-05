import React from "react";
import CommmonStyles from "../../styles/CommonWrapper";
import { withStyles, Fab } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { buildProdDetailsFromSelectedProds } from "../helpers/Helper";
import { handleUpdate, handleSave } from "recipe/components/RecipePage.actions";

function RecipeFabBtn({ classes }) {
  const dispatch = useDispatch();
  const currentRecipe = useSelector(
    (state) => state.currentRecipeRed,
    shallowEqual
  );
  const selectedProducts = useSelector((state) => state.selectedProducts);
  const productMap = useSelector((state) => state.products);
  const quantityMap = useSelector((state) => state.quantityMap);

  const combinedClasses = `${classes.floatingBtn}`;
  const prodsDetail = buildProdDetailsFromSelectedProds({
    selectedProducts,
    productMap,
    currentRecipe,
    quantityMap,
  });

  const actionButton = () => {
    return currentRecipe.id ? (
      <Fab
        color="primary"
        onClick={() =>
          handleUpdate({
            dispatch,
            currentRecipe,
            selectedProducts,
            prodsDetail,
          })
        }
      >
        <SaveIcon />
      </Fab>
    ) : (
      <Fab
        color="secondary"
        onClick={() =>
          handleSave({
            dispatch,
            currentRecipe,
            selectedProducts,
            prodsDetail,
          })
        }
      >
        <SaveIcon />
      </Fab>
    );
  };
  return <div className={combinedClasses}>{actionButton()}</div>;
}
export default withStyles(CommmonStyles)(RecipeFabBtn);
