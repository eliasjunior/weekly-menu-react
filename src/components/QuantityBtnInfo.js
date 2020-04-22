import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//TODO need to check type unit or grams
export default function QuantityBtnInfo({ quantityType, quantity }) {
  // const dispatch = useDispatch();
  // const quantity = useSelector((state) => state.quantityMap[prodId]);
  const reciCount = "2";
  const picked = "1";
  return (
    <>
      <Tooltip title={" Chocolate cake " + reciCount + ", picked " + picked}>
        <IconButton aria-label="delete">{quantity}</IconButton>
      </Tooltip>
    </>
  );
}
