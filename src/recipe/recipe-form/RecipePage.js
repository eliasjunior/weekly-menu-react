import React, { useState } from "react";
import { AppWeekBar } from "header/AppWeekBar";
import CategoryList from "inventory/category/components";
import { TextField } from "@material-ui/core";
import RecipeBtns from "./RecipeBtns";
import { styles } from "./styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { listFilterAction } from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { recipeUpdateName } from "app-redux/actions/RecipeAction";

function RecipePage() {
  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories, shallowEqual);
  const recipe = useSelector(state => state.currentRecipe);

  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(listFilterAction("", categories));

  const onChangeName = e => dispatch(recipeUpdateName({ name: e.target.name }));

  return (
    <CommonErrorBoundary>
      <AppWeekBar title={"Recipe"}></AppWeekBar>
      <TextField
        style={styles.input}
        label="Recipe name"
        value={recipe.name}
        onChange={onChangeName}
      ></TextField>
      <RecipeBtns
        isToUpdate={recipe.id ? true : false}
        name={recipe.name}
      ></RecipeBtns>
      <CategoryList></CategoryList>
    </CommonErrorBoundary>
  );
}
export default RecipePage;
