import React from "react";
import { Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import IncludeRecipe from "@material-ui/icons/PlaylistAdd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AppWeekBar } from "header/AppWeekBar";
import RecipeListComponent from "./RecipeListComponent";
import CommonStyles from "styles/CommonStyles";
import { AppConstant } from "common/AppConstant";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import { loadProductsToRecipe } from "../RecipeHelper";

function RecipeListPage(props) {
  const recipes = useSelector((state) => state.recipes, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);
  const recipesWithProducts = loadProductsToRecipe(recipes, products);

  const dispatch = useDispatch();
  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplatList(recipesWithProducts));

  const { classes } = props;

  const addButton = () => {
    return props.location.search ? (
      <Fab
        color="secondary"
        className={classes.floatingBtn}
        aria-label="include Recipe"
        onClick={() => props.history.goBack()}
      >
        <IncludeRecipe />
      </Fab>
    ) : (
      <Fab
        color="secondary"
        className={classes.floatingBtn}
        aria-label="new Recipe"
      >
        <Link to={AppConstant.LOCATION.newRecipe.path}>
          <AddIcon />
        </Link>
      </Fab>
    );
  };
  console.log("Recipe List");
  return (
    <div>
      <AppWeekBar title="Recipe List"></AppWeekBar>
      {addButton()}
      <RecipeListComponent recipes={recipesWithProducts}></RecipeListComponent>
    </div>
  );
}
RecipeListPage.propTypes = {
  callbackIncludeRecipe: PropTypes.func,
};

export default withStyles(CommonStyles)(RecipeListPage);
