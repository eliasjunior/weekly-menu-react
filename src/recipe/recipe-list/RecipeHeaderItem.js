import React from "react";
import { LOCATION } from "common/AppConstant";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { updateCurrentRecipe } from "app-redux/actions/RecipeAction";
import { useDispatch } from "react-redux";
import { addAllSelectedProduct } from "app-redux/actions/ProductSelectionAction";
import { addAllQtd } from "app-redux/actions/QuantityPickAction";
import { quantityMapperProdsDetail } from "common/Util";
import { RecipeSelection } from "./RecipeSelection";

const IMG_SRC = "/recipe/fork.jpg";

export const RecipeHeaderItem = ({ recipe, history }) => {
  const dispatch = useDispatch();
  const editRecipe = () => {
    history.push(`${LOCATION.newRecipe.path}/${recipe.id}`);
    dispatch(
      addAllSelectedProduct({
        toggled: true,
        reset: true,
        prodIds: recipe.products.map((prod) => prod.id),
      })
    );
    dispatch(
      updateCurrentRecipe({
        name: recipe.name,
        id: recipe.id,
        prodsDetail: recipe.prodsDetail,
      })
    );
    dispatch(addAllQtd(quantityMapperProdsDetail(recipe.prodsDetail)));
  };

  const isEditBtnDisplay = () => {
    return (
      <ListItemSecondaryAction>
        <RecipeSelection recipe={recipe}></RecipeSelection>
      </ListItemSecondaryAction>
    );
  };

  return (
    <ListItem button onClick={editRecipe}>
      <ListItemAvatar>
        <Avatar alt="Recipe" src={IMG_SRC}></Avatar>
      </ListItemAvatar>
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
