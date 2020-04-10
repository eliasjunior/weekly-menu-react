import React from "react";
import CommmonStyles from "../../styles/CommonStyles";
import { withStyles, Fab } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  createRecipeAsync,
  updateRecipeAsync,
} from "app-redux/actions/RecipesActions";
import { isRecipeFormValid } from "./FormValidation";

// classes from commonSytles below! withStyles(CommmonStyles)
function RecipeBtns({ classes }) {
  const dispatch = useDispatch();
  const currentRecipe = useSelector(
    (state) => state.currentRecipe,
    shallowEqual
  );
  const { name, products, id } = currentRecipe;
  const combinedClasses = `${classes.floatingBtn}`;

  const handleSave = async () => {
    if (isRecipeFormValid({ name, dispatch, products })) {
      const recipe = {
        name,
        products,
      };
      await dispatch(createRecipeAsync(recipe));
      console.log(" ---- DONE! ---- ");
    }
  };
  const handleUpdate = async () => {
    if (isRecipeFormValid({ name, dispatch, products })) {
      const recipe = {
        name,
        id,
        products,
      };
      await dispatch(updateRecipeAsync(recipe));
      console.log(" ---- LORD VADER! DONE ---- ");
    }
  };
  const actionButton = () => {
    return currentRecipe.id ? (
      <Fab color="secondary" onClick={handleUpdate}>
        <EditIcon />
      </Fab>
    ) : (
      <Fab color="secondary" onClick={handleSave}>
        <SaveIcon />
      </Fab>
    );
  };
  return <div className={combinedClasses}>{actionButton()}</div>;
}
export default withStyles(CommmonStyles)(RecipeBtns);
