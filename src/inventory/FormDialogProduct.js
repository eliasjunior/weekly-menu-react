import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import FormChildAction from "../common/FormChildAction";
import { requiredParameter } from "common/Util";
import { UNIT_TYPE, WEIGHT_TYPE } from "./product/Constant";

function FormDialogProduct({
  onDisplay = requiredParameter("onDisplay"),
  title = requiredParameter("title"),
  form = requiredParameter("form"),
  isToUpdate,
  onClose,
  onActionMethod,
}) {
  const [name, setName] = useState(form.name);
  //TODO revise here, its initialize with undefined then get an warning, because it should start with a value controlled vs uncontrolled
  const [quantityType, setQuantityType] = useState(form.quantityType);
  // const [quantityType, setQuantityType] = useState(
  //   form.quantityType ? form.quantityType : UNIT_TYPE
  // );
  // console.log("AT SOME", form.quantityType, form.name, quantityType);
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
            defaultValue={form.name}
            onChange={(e) => setName(e.target.value)}
            autoFocus={true}
          ></TextField>
          <div style={{ paddingTop: "20px" }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                aria-label="quantityType"
                name="quantityType"
                value={quantityType}
                onChange={(e) => setQuantityType(e.target.value)}
              >
                <FormControlLabel
                  value={UNIT_TYPE}
                  control={<Radio />}
                  label="Unit"
                />
                <FormControlLabel
                  value={WEIGHT_TYPE}
                  control={<Radio />}
                  label="Weight"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <FormChildAction
            onActionMethod={async () => {
              onActionMethod({ name, quantityType });
            }}
            onCloseDialog={onClose}
            isToUpdate={isToUpdate}
          ></FormChildAction>
        </DialogActions>
      </Dialog>
    </div>
  );
}
FormDialogProduct.propTypes = {
  onActionMethod: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  onDisplay: PropTypes.bool.isRequired,
  form: PropTypes.object,
};

export default FormDialogProduct;
