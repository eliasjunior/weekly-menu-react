import React from "react";
import { Link } from "react-router-dom";
import { AppConstant } from "common/AppConstant";
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
import { useDispatch } from "react-redux";

export const RecipeHeaderItem = ({ recipe, onSelectRecipe }) => {
  const dispatch = useDispatch();

  const onCheckAction = (e) => {
    recipe.checked = e.target.checked;
    const itemProps = {
      checked: recipe.checked,
      recipe,
    };
    onSelectRecipe(itemProps);
  };

  //TODO do like in category, add to a service
  const isCheckboxDisplay = () => {
    return (
      <Checkbox
        checked={recipe.checked}
        onClick={onCheckAction}
        value={recipe.id ? recipe.id.toString() : ""}
      ></Checkbox>
    );
  };
  // TODO do like in category, add to a service
  const isEditBtnDisplay = () => {
    return (
      <ListItemSecondaryAction>
        <Button variant="outlined" color="primary">
          <Link
            to={`${AppConstant.LOCATION.newRecipe.path}/${recipe.id}`}
            onClick={() => {
              console.log(">>", recipe.products);
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
      {isCheckboxDisplay()}
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
