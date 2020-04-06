import React, { useState } from "react";
import { AppWeekBar } from "header/AppWeekBar";
import CategoryList from "inventory/category/components";
import { TextField } from "@material-ui/core";
import RecipeBtns from "./RecipeBtns";
import { styles } from "./styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import {
  recipeUpdateName,
  recipeUpdateCurrent,
} from "app-redux/actions/RecipeAction";
import { loadProductsToRecipe } from "../RecipeHelper";

function RecipeUpdatePage({ match }) {
  const [uggly, setUggly] = useState(false);
  const dispatch = useDispatch();
  //TODO improve performance
  const categories = useSelector((state) => state.categories, shallowEqual);
  const recipes = useSelector((state) => state.recipes, shallowEqual);
  const products = useSelector((state) => state.products, shallowEqual);
  const recipesWithProducts = loadProductsToRecipe(recipes, products);

  //TODO IS TOO SLOW, NEED TO REVIEW HERE
  const name = useSelector((state) => state.currentRecipe.name);
  // for reload page will need it, just because this line I need this component
  const recipe = getRecipeFromUrl(match, recipesWithProducts);
  if (uggly) {
    recipe.name = name;
  }
  dispatch(recipeUpdateCurrent(recipe));

  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplatList(categories));

  const onChangeName = (e) => {
    //TODO I CAN ONLY UPDATE THE RECIPES AFTER PUT RESPONSE SUCESS
    dispatch(recipeUpdateName({ name: e.target.value }));
    setUggly(true);
  };

  return (
    <CommonErrorBoundary>
      <AppWeekBar title={"Update Recipe"}></AppWeekBar>
      <TextField
        style={styles.input}
        label="Recipe name"
        value={name}
        onChange={onChangeName}
      ></TextField>
      <RecipeBtns isToUpdate={true}></RecipeBtns>
      <CategoryList></CategoryList>
    </CommonErrorBoundary>
  );
}
export default RecipeUpdatePage;

function getRecipeFromUrl(match = {}, recipes) {
  const { params = {} } = match;
  const { id } = params;

  const rec = recipes.find((rec) => parseInt(rec.id, 10) === parseInt(id, 10));
  return rec ? rec : { name: "" };
}
