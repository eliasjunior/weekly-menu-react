import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getChecked, handleOnChange } from "./ItemSelectionPresenter";

export default function ItemSelection({ name, prodId }) {
  const dispatch = useDispatch();
  const recipeProds = useSelector(state => state.recipeProds);
  const checked = getChecked(recipeProds, prodId);
  return (
    <div>
      <Checkbox
        onChange={() => {
          handleOnChange({ dispatch, name, prodId });
        }}
        checked={checked}
        value={name}
      ></Checkbox>
    </div>
  );
}
