import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//TODO move
const UNIT = "UNIT";

//TODO need to check type unit or grams
export default function QuantityBtnInfo({
  quantityType,
  quantity = 0,
  recipes = [],
}) {
  // TODO review here,
  const labelType = quantityType === UNIT ? "qty" : "g";
  let quantityDisplay = quantity;
  const title = recipes
    .map((rec) => {
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
