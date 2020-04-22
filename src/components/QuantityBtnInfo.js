import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//TODO need to check type unit or grams
export default function QuantityBtnInfo({
  quantityType,
  quantity = 0,
  recipes = [],
}) {
  // TODO review here,
  const labelType = quantityType === "UNIT" ? "qty" : "g";
  let quantityDisplay = quantity;
  const title = recipes
    .map((rec) => {
      console.log("----------", rec);
      quantityDisplay = quantityDisplay + rec.quantity;
      return rec.name;
    })
    .join(", ");

  return (
    <Tooltip title={title}>
      <IconButton aria-label="delete">
        {quantityDisplay + " " + labelType}
      </IconButton>
    </Tooltip>
  );
}
