import React from "react";
import { Divider, IconButton } from "@material-ui/core";
import Outlined from "@material-ui/icons/DeleteOutlined";
import FileCopy from "@material-ui/icons/FileCopy";
import { useDispatch } from "react-redux";
import { clearCartAction } from "app-redux/actions/CartAction";
import { setDisplayList } from "app-redux/actions/ListFilterAction";
import { cloneCartAction } from "app-redux/actions/CartAction";

export default function TopBtn({ list }) {
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
          dispatch(setDisplayList([]));
          dispatch(clearCartAction());
        }}
      >
        <Outlined></Outlined>
      </IconButton>
      <IconButton
        aria-label="Comments"
        onClick={() => {
          dispatch(cloneCartAction(""));
        }}
      >
        <FileCopy></FileCopy>
      </IconButton>
    </>
  );
}
