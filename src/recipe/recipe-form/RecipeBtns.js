import Button from "@material-ui/core/Button";
import React from "react";
import CommmonStyles from "../../styles/CommonStyles";
import { withStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { infoMessage } from "app-redux/actions/AlertHandlerAction";
import {
  createRecipeAsync,
  updateRecipeAsync
} from "app-redux/actions/RecipesActions";

function RecipeBtns({ classes, isToUpdate }) {
  const dispatch = useDispatch();
  const currentRecipe = useSelector(state => state.currentRecipe, shallowEqual);
  const combinedClasses = `${classes.floatingBtn}`;
  const { name, products, id } = currentRecipe;
  const handleSave = async () => {
    if (isRecipeFormValid({ name, dispatch, products })) {
      const recipe = {
        name,
        products
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
        products
      };
      await dispatch(updateRecipeAsync(recipe));
      console.log(" ---- LORD VADER! DONE ---- ");
    }
  };
  const actionButton = () => {
    return isToUpdate ? (
      <Button color="secondary" variant="fab" onClick={handleUpdate}>
        <EditIcon />
      </Button>
    ) : (
      <Button color="secondary" variant="fab" onClick={handleSave}>
        <SaveIcon />
      </Button>
    );
  };
  return <div className={combinedClasses}>{actionButton()}</div>;
}

//TODO move to a form validation file or something else
function isRecipeFormValid({ name, dispatch, products }) {
  if (products.length === 0) {
    dispatch(infoMessage("oops you have to check at least one product"));
    return false;
  }
  if (!name) {
    dispatch(infoMessage("You cannot save a recipe without a name!"));
    return false;
  }

  return true;
}

export default withStyles(CommmonStyles)(RecipeBtns);
