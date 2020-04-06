import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getChecked, handleOnChange } from "./ItemSelectionPresenter";

export default function ItemSelection({ product }) {
  const dispatch = useDispatch();
  const recipeProds = useSelector((state) => state.currentRecipe.products);

  const checked = getChecked(recipeProds, product.id);
  return (
    <div>
      <Checkbox
        onChange={() => {
          handleOnChange({ dispatch, product });
        }}
        checked={checked}
        value={product.name}
      ></Checkbox>
    </div>
  );
}
