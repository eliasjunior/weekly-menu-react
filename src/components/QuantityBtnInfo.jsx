import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { ListItemSecondaryAction } from "@material-ui/core";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";
import { greenColor } from "styles/CommonStyles";
import { useDispatch } from "react-redux";
import { flagPickedShotProd } from "app-redux/actions/ListFilterAction";

export default function QuantityBtnInfo({
  quantityDisplay,
  recDisplay,
  id,
  picked,
}) {
  const dispatch = useDispatch();
  const handleUpdateShopList = () => {
    dispatch(flagPickedShotProd({ id, picked: picked ? false : true }));
  };

  return (
    <ListItemSecondaryAction>
      <IconButton aria-label="Comments" onClick={() => handleUpdateShopList()}>
        <PlaylistAddCheck style={picked ? {} : greenColor} />
      </IconButton>
      <Tooltip title={recDisplay ? recDisplay : "-"}>
        <IconButton aria-label="delete">{quantityDisplay}</IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  );
}
