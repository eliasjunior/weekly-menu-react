import React from "react";
import Plus from "@material-ui/icons/Add";
import Minus from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import { redColor, greenColor } from "styles/CommonStyles2";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQdy } from "app-redux/actions/QuantityPickAction";

//TODO need to maybe create a component for each type
export default function Quantity({ prodId, type = "UNIT", quantityDefault }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantityMap[prodId]);
  const stepValue = quantityDefault;

  const getQuantity = () => {
    const symbol = type === "UNIT" ? "" : "g";
    if (quantity) {
      return <span>{quantity + " " + symbol}</span>;
    } else {
      return <span>{stepValue + " " + symbol}</span>;
    }
  };
  return (
    <>
      <IconButton
        aria-label="Comments"
        onClick={() => {
          dispatch(increaseQdy(prodId, stepValue));
        }}
      >
        <Plus style={greenColor}></Plus>
      </IconButton>
      {getQuantity()}
      <IconButton
        aria-label="Comments"
        onClick={() => {
          if (quantity > stepValue) {
            dispatch(decreaseQty(prodId, stepValue));
          }
        }}
      >
        <Minus style={redColor}></Minus>
      </IconButton>
    </>
  );
}
