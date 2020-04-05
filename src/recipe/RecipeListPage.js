import React from "react";
import { AppWeekBar } from "../header/AppWeekBar";
import { Button, Fab } from "@material-ui/core";
import PropTypes from "prop-types";
import UtilCollectionService from "../service/UtilCollectionService";
import RecipeListComponent from "./RecipeListComponent";
import IncludeRecipe from "@material-ui/icons/PlaylistAdd";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import CommonStyles from "../styles/CommonStyles";
import { Link } from "react-router-dom";
import { AppConstant } from "../common/AppConstant";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";

function RecipeListPage(props) {
  const recipes = useSelector(state => state.recipes, shallowEqual);

  const dispatch = useDispatch();
  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplatList(recipes));
  console.log("Recipe List");
  const { classes } = props;
  const onSelectRecipe = selected => {
    // TODO replace this here with localApi
    // const item = {
    //   recipe: UtilCollectionService.recipeToAdd(selected.recipe),
    //   checked: selected.checked
    // };
    //  props.callbackIncludeRecipe(item);
    console.log("rebuild");
  };

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
  return (
    <div>
      <AppWeekBar title="Recipe List"></AppWeekBar>
      {addButton()}
      <RecipeListComponent
        onSelectRecipe={onSelectRecipe}
        recipes={recipes}
      ></RecipeListComponent>
    </div>
  );
}
RecipeListPage.propTypes = {
  callbackIncludeRecipe: PropTypes.func
};

export default withStyles(CommonStyles)(RecipeListPage);
