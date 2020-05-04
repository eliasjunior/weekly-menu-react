import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export default function QuantityBtnInfo({ quantityDisplay, recDisplay }) {
  return (
    <Tooltip title={recDisplay ? recDisplay : "-"}>
      <IconButton aria-label="delete">{quantityDisplay}</IconButton>
    </Tooltip>
  );
}
