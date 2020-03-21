import React, { useState } from "react";
import { AppWeekBar } from "header/AppWeekBar";
import CategoryList from "inventory/category/components";
import { TextField } from "@material-ui/core";
import RecipeActions from "./RecipeActions";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { formSelectionAction } from "app-redux/actions/ProductFormAction";
import ErrorBoundary from "error-handlers/ErrorBoundaryComponent";
import { infoMessage } from "app-redux/actions/AlertHandlerAction";

function RecipePage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const onChangeName = e => {
    setName(e.target.value);
  };
  const updateRecipe = () => {};
  const saveRecipe = () => {
    if (!name) {
      dispatch(infoMessage("oops blanco noooo"));
    }
  };

  dispatch(formSelectionAction());
  return (
    <ErrorBoundary>
      <AppWeekBar title={"Recipe"}></AppWeekBar>
      <TextField
        style={styles.input}
        label="Recipe name"
        value={name}
        onChange={onChangeName}
      ></TextField>
      <RecipeActions
        isToUpdate={id ? true : false}
        onUpdateAction={updateRecipe}
        onSaveAction={saveRecipe}
      ></RecipeActions>
      <CategoryList
        parentComponent="RecipePage"
        onSelectAllProd={() => {}}
        onOpenDialog={() => {}}
      ></CategoryList>
    </ErrorBoundary>
  );
}
export default RecipePage;
