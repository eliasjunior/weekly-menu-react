import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getChecked, handleOnChange } from "./ItemSelectionPresenter";

export default function ItemSelection({ product }) {
  const dispatch = useDispatch();
  const checkedIds = useSelector((state) => state.selectedProducts);

  const checked = getChecked(checkedIds, product.id);
  return (
    <div>
      <Checkbox
        onChange={() => {
          handleOnChange({ dispatch, prodId: product.id });
        }}
        checked={checked}
        value={product.name}
      ></Checkbox>
    </div>
  );
}
