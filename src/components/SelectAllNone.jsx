import React, { useState } from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import PropTypes from "prop-types";
import { stylesSelect } from "./styles";
import { useDispatch } from "react-redux";
import { addAllSelectedProduct } from "app-redux/actions/ProductSelectionAction";

function SelectAllNone({ products }) {
  const [checkedAll, setCheckedAll] = useState(false);
  const dispatch = useDispatch();
  const allProdsFromCat = products.map((prod) => prod.id);

  const label = checkedAll ? "Unselect All" : "Select All";
  return (
    <div style={stylesSelect.content}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={checkedAll}
              onChange={() => {
                setCheckedAll(!checkedAll);
                dispatch(
                  addAllSelectedProduct({
                    toggled: !checkedAll,
                    prodIds: allProdsFromCat,
                  })
                );
              }}
              value={label}
            ></Switch>
          }
          label={label}
        ></FormControlLabel>
      </FormGroup>
    </div>
  );
}

SelectAllNone.propTypes = {
  checked: PropTypes.bool,
  onSelectAllNone: PropTypes.func,
};
export default SelectAllNone;
