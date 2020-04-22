import React from "react";
import { Link } from "react-router-dom";
import { LOCATION } from "common/AppConstant";
import {
  Button,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from "@material-ui/core";
import IconRecipe from "@material-ui/icons/Receipt";
import PropTypes from "prop-types";
import { purple } from "@material-ui/core/colors";
import { recipeUpdateCurrent } from "app-redux/actions/RecipeAction";
import { useDispatch, useSelector } from "react-redux";
import { recipeSelectionAction } from "app-redux/actions/RecipeSelectionAction";

export const RecipeHeaderItem = ({ recipe }) => {
  const dispatch = useDispatch();

  const RecipeSelection = () => {
    const { id: recId } = recipe;
    const recIdsSelected = useSelector((state) => state.selectedRecIds);

    const checked = recIdsSelected.filter((id) => id === recId).length > 0;
    return (
      <Checkbox
        onChange={() => dispatch(recipeSelectionAction(recId))}
        checked={checked}
        value={recipe.name}
      ></Checkbox>
    );
  };
  // TODO do like in category, add to a service
  const isEditBtnDisplay = () => {
    return (
      <ListItemSecondaryAction>
        <Button variant="outlined" color="primary">
          <Link
            to={`${LOCATION.newRecipe.path}/${recipe.id}`}
            onClick={() => {
              dispatch(
                recipeUpdateCurrent({
                  name: recipe.name,
                  id: recipe.id,
                  products: recipe.products,
                })
              );
            }}
          >
            EDIT
          </Link>
        </Button>
      </ListItemSecondaryAction>
    );
  };

  return (
    <ListItem style={{ backgroundColor: purple[300] }}>
      <RecipeSelection></RecipeSelection>
      <ListItemIcon>
        <IconRecipe />
      </ListItemIcon>
      <ListItemText primary={recipe.name} />
      {isEditBtnDisplay()}
    </ListItem>
  );
};

RecipeHeaderItem.propTypes = {
  recipe: PropTypes.object,
  isNotEditable: PropTypes.bool,
  isRecipeNotSelectable: PropTypes.bool,
  onSelectRecipe: PropTypes.func,
};
