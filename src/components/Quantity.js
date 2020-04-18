import React, { useState } from "react";
import PlusOne from "@material-ui/icons/PlusOne";
import MinusOne from "@material-ui/icons/ExposureNeg1";
import IconButton from "@material-ui/core/IconButton";
import { redColor, greenColor } from "styles/CommonStyles2";
import { useDispatch, useSelector } from "react-redux";
import { minusOne, plusOne } from "app-redux/actions/QuantityPickAction";

//TODO need to check type unit or grams
export default function Quantity({ prodId }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantityPick[prodId]);
  return (
    <>
      <IconButton
        aria-label="Comments"
        onClick={() => {
          dispatch(plusOne(prodId));
        }}
      >
        <PlusOne style={greenColor}></PlusOne>
      </IconButton>
      <span>{quantity ? quantity : 1}</span>
      <IconButton
        aria-label="Comments"
        onClick={() => {
          if (quantity > 1) {
            dispatch(minusOne(prodId));
          }
        }}
      >
        <MinusOne style={redColor}></MinusOne>
      </IconButton>
    </>
  );
}
