import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@material-ui/core";
import FormChildAction from "../common/FormChildAction";
import { requiredParameter } from "common/Util";

function FormDialog({
  onDisplay = requiredParameter("onDisplay"),
  title,
  form = requiredParameter("form"),
  onClose,
  onChangeName,
  onActionMethod
}) {
  return (
    <div>
      <Dialog
        open={onDisplay}
        onClose={() => onClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            label={form.placeHolder}
            defaultValue={form.value}
            onChange={onChangeName}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <FormChildAction
            onActionMethod={onActionMethod}
            onCloseDialog={onClose}
          ></FormChildAction>
        </DialogActions>
      </Dialog>
    </div>
  );
}
FormDialog.propTypes = {
  onActionMethod: PropTypes.func,
  title: PropTypes.string
};

export default FormDialog;
