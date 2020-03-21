import React from "react";
import SnackMessage from "./SnackMessage";

import { closeMessage } from "app-redux/actions/AlertHandlerAction";
import { useDispatch } from "react-redux";
import { stylesAlert } from "./styles";

function MessageComponent({ message, isOpen, type }) {
  const dispatch = useDispatch();
  if (!message) {
    return null;
  }
  const handleClose = () => {
    dispatch(closeMessage());
  };
  return (
    <SnackMessage
      icon={stylesAlert[type].icon}
      message={message}
      onClose={handleClose}
      open={isOpen}
      styles={stylesAlert[type].theme}
    />
  );
}

export default MessageComponent;
