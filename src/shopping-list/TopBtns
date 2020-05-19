import React from "react";
import { Divider, IconButton } from "@material-ui/core";
import Restore from "@material-ui/icons/Restore";
import { useDispatch } from "react-redux";
import { clearShoppingListAction } from "app-redux/actions/ShoppingListAction";
import { setDisplatList } from "app-redux/actions/ListFilterAction";

export default function TopBtns({ list }) {
  const dispatch = useDispatch();
  if (list.length === 0) {
    return "";
  }
  return (
    <>
      <Divider></Divider>
      <IconButton
        aria-label="Comments"
        onClick={() => {
          dispatch(setDisplatList([]));
          dispatch(clearShoppingListAction());
        }}
      >
        <Restore></Restore>
      </IconButton>
    </>
  );
}
