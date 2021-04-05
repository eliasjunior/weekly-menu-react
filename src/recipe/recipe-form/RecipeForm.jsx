import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { styles } from "./styles";
import { updateCurrentRecipeName } from "app-redux/actions/RecipeAction";
import { useDispatch } from "react-redux";

function RecipeForm({ prevName }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(prevName);

  useEffect(() => {
    function handleNameChanged(nameChanged) {
      setName(nameChanged);
    }
    handleNameChanged(prevName);
  }, [prevName]);

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setName(value);
    dispatch(updateCurrentRecipeName({ name: value }));
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
