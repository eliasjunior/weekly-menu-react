import React from "react";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import RecipeListComponent from "./RecipeListComponent";
import { LOCATION, parentComponent } from "common/AppConstant";
import { formEditAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import { fillRecipesProducts } from "../RecipeHelper";
import { setPageTitle, setPageLocation } from "app-redux/actions/PageAction";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import cloneDeep from "lodash.clonedeep";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  floatingBtn: {
    margin: theme.spacing(1),
    zIndex: 999,
    position: "fixed",
    top: "60px",
    right: 0,
  },
}));

function RecipeListPage({ history }) {
  const recipes = useSelector((state) => state.recipes, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);
  const recipesWithProducts = fillRecipesProducts(cloneDeep(recipes), products);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { newRecipe, newShoppingList } = LOCATION;

  //Initial sets to the children

  dispatch(setDisplatList(recipesWithProducts));
  dispatch(setPageLocation(parentComponent.RECIPE_LIST_PAGE));
  dispatch(setPageTitle("Recipes"));
  dispatch(formEditAction());

  const addButton = () => {
    return (
      <div className={classes.floatingBtn}>
        <Fab
          size="small"
          color="secondary"
          aria-label="new Recipe"
          className={classes.margin}
        >
          <Link to={newShoppingList.path}>
            <AddShoppingCartIcon />
          </Link>
        </Fab>
        <Fab size="small" color="primary">
          <Link to={newRecipe.path}>
            <AddIcon />
          </Link>
        </Fab>
      </div>
    );
  };
  return (
    <>
      {addButton()}
      <RecipeListComponent
        recipes={recipesWithProducts}
        history={history}
      ></RecipeListComponent>
    </>
  );
}

export default RecipeListPage;
