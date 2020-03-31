import Button from "@material-ui/core/Button";
import React from "react";
import CommmonStyles from "../../styles/CommonStyles";
import { withStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { infoMessage } from "app-redux/actions/AlertHandlerAction";
import { createRecipeAsync } from "app-redux/actions/RecipesActions";

function RecipeBtns({ name, classes, isToUpdate }) {
  const dispatch = useDispatch();
  const currentRecipe = useSelector(
    state => state.currentRecipe.products,
    shallowEqual
  );
  const combinedClasses = `${classes.floatingBtn}`;
  const handleSave = async () => {
    if (validateRecipe({ name, dispatch, currentRecipe })) {
      const recipe = {
        name,
        products: currentRecipe
      };
      console.log(recipe);
      await dispatch(createRecipeAsync(recipe));
      console.log(" ---- DONE! ---- ");
    }
  };
  const handleUpdate = () => {};
  const actionButton = () => {
    return isToUpdate ? (
      <Button color="secondary" variant="fab" onClick={handleUpdate}>
        <SaveIcon />
      </Button>
    ) : (
      <Button color="secondary" variant="fab" onClick={handleSave}>
        <SaveIcon />
      </Button>
    );
  };
  return <div className={combinedClasses}>{actionButton()}</div>;
}

//TODO move to a validation file or something else
function validateRecipe({ name, dispatch, currentRecipe }) {
  if (currentRecipe.length === 0) {
    dispatch(infoMessage("oops blanco no products, are you nuts ?"));
    return false;
  }
  if (!name) {
    dispatch(infoMessage("no name, noooooooo"));
    return false;
  }

  return true;
}

export default withStyles(CommmonStyles)(RecipeBtns);
