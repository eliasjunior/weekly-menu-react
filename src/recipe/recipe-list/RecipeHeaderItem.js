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
import { UpdateCurrentRecipe } from "app-redux/actions/RecipeAction";
import { useDispatch, useSelector } from "react-redux";
import { addProdsRecipe } from "app-redux/actions/ShoppingListAction";
import { addAllSelectedProduct } from "app-redux/actions/ProductSelectionAction";

export const RecipeHeaderItem = ({ recipe }) => {
  const dispatch = useDispatch();

  const RecipeSelection = () => {
    const productMap = useSelector((state) => state.products);
    const recipeSelected = useSelector(
      (state) => state.shoppingList.recipes.byId[recipe.id]
    );
    const checked = recipeSelected !== undefined;

    return (
      <Checkbox
        onChange={() =>
          dispatch(
            addProdsRecipe({
              recId: recipe.id,
              prods: recipe.prodsDetail.map((detail) => ({
                id: detail.id,
                catId: productMap.byId[detail.id].catId,
              })),
              checked,
            })
          )
        }
        checked={checked}
        value={recipe.name}
      ></Checkbox>
    );
  };
  const isEditBtnDisplay = () => {
    return (
      <ListItemSecondaryAction>
        <Button variant="outlined" color="primary">
          <Link
            to={`${LOCATION.newRecipe.path}/${recipe.id}`}
            onClick={() => {
              dispatch(
                addAllSelectedProduct({
                  toggled: true,
                  reset: true,
                  prodIds: recipe.products.map((prod) => prod.id),
                })
              );
              dispatch(
                UpdateCurrentRecipe({
                  name: recipe.name,
                  id: recipe.id,
                  products: recipe.products,
                  prodsDetail: recipe.prodsDetail,
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
