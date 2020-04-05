import React from "react";
import { AppWeekBar } from "header/AppWeekBar";
import CategoryList from "inventory/category/components";
import { TextField } from "@material-ui/core";
import RecipeBtns from "./RecipeBtns";
import { styles } from "./styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
import { recipeUpdateName } from "app-redux/actions/RecipeAction";

function RecipePage() {
  const dispatch = useDispatch();

  //TODO improve performance
  const categories = useSelector(state => state.categories, shallowEqual);

  //Initial sets to the children
  dispatch(formSelectionAction());
  dispatch(setDisplatList(categories));

  const onChangeName = e =>
    dispatch(recipeUpdateName({ name: e.target.value }));

  return (
    <CommonErrorBoundary>
      <AppWeekBar title={"Recipe"}></AppWeekBar>
      <TextField
        style={styles.input}
        label="Recipe name"
        onChange={onChangeName}
      ></TextField>
      <RecipeBtns></RecipeBtns>
      <CategoryList></CategoryList>
    </CommonErrorBoundary>
  );
}

export default RecipePage;
