import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { styles } from "./styles";
import { recipeUpdateName } from "app-redux/actions/RecipeAction";
import { useDispatch } from "react-redux";

function RecipeForm({ prevName }) {
  const [name, setName] = useState(prevName);

  useEffect(() => {
    function handleNameChanged(nameChanged) {
      setName(nameChanged);
    }
    handleNameChanged(prevName);
  }, [prevName]);

  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    dispatch(recipeUpdateName({ name: e.target.value }));
    setName(e.target.value);
  };

  return (
    <TextField
      style={styles.input}
      label="Recipe name"
      value={name}
      onChange={handleChangeName}
    ></TextField>
  );
}

export default RecipeForm;
