import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
import { closeMessage } from "app-redux/actions/AlertHandlerAction";

export default function() {
  const message = useSelector(state => state.errorHandler.message);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeMessage());
  };
  return message ? (
    <MessageComponent
      message={message}
      isOpen={message ? true : false}
      onClose={handleClose}
      type="error"
    ></MessageComponent>
  ) : (
    ""
  );
}
