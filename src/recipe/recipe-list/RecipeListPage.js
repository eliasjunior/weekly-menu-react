import React from "react";
import { Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import RecipeListComponent from "./RecipeListComponent";
import CommonStyles from "styles/CommonStyles";
import { LOCATION, parentComponent } from "common/AppConstant";
import { formViewAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import { loadProductsToRecipe } from "../RecipeHelper";
import { setPageTitle, setPageLocation } from "app-redux/actions/PageAction";

function RecipeListPage({ classes }) {
  const recipes = useSelector((state) => state.recipes, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);
  const recipesWithProducts = loadProductsToRecipe(recipes, products);

  const dispatch = useDispatch();
  //Initial sets to the children

  dispatch(setDisplatList(recipesWithProducts));
  dispatch(setPageLocation(parentComponent.RECIPE_LIST_PAGE));
  dispatch(setPageTitle("Recipes"));
  dispatch(formViewAction());

  const addButton = () => {
    return (
      <Fab
        color="secondary"
        className={classes.floatingBtn}
        aria-label="new Recipe"
      >
        <Link to={LOCATION.newShoppingList.path}>
          <AddIcon />
        </Link>
      </Fab>
    );
  };
  return (
    <div>
      {addButton()}
      <RecipeListComponent recipes={recipesWithProducts}></RecipeListComponent>
    </div>
  );
}

export default withStyles(CommonStyles)(RecipeListPage);
