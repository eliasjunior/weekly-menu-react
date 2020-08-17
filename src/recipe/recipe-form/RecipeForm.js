import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { styles } from "./styles";

function RecipeForm({ prevName }) {
  const [name, setName] = useState(prevName);

  useEffect(() => {
    function handleNameChanged(nameChanged) {
      setName(nameChanged);
    }
    handleNameChanged(prevName);
  }, [prevName]);

  const handleChangeName = (e) => {
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
