import React from "react";
import Edit from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";

function FormChildAction({ isToUpdate, onActionMethod, onCloseDialog }) {
  const isUpdateOrSave = (isToUpdate) => {
    if (isToUpdate) {
      return (
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => onActionMethod()}
        >
          <Edit />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => onActionMethod()}
        >
          <SaveIcon />
        </IconButton>
      );
    }
  };

  const closeBtn = () => {
    return (
      <IconButton
        variant="contained"
        color="secondary"
        onClick={() => onCloseDialog()}
      >
        <Close />
      </IconButton>
    );
  };
  return (
    <div>
      {isUpdateOrSave(isToUpdate)}
      {closeBtn()}
    </div>
  );
}

export default FormChildAction;
