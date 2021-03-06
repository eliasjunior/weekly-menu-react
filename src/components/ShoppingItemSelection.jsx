import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addSimpleProduct } from "app-redux/actions/CartAction";

export default function ShoppingItemSelection({ product }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.cart.products.selected);
  const checked = selected.includes(product.id);

  const handleOnChange = () => {
    dispatch(
      addSimpleProduct({
        catId: product.catId,
        prodId: product.id,
        checked,
      })
    );
  };

  return (
    <div>
      <Checkbox
        onChange={handleOnChange}
        checked={checked}
        value={product.name}
      ></Checkbox>
    </div>
  );
}
