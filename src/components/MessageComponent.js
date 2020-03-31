import React from "react";
import SnackMessage from "./SnackMessage";

import { closeMessage } from "app-redux/actions/AlertHandlerAction";
import { useDispatch } from "react-redux";
import { stylesAlert } from "./styles";
import { requiredParameter } from "common/Util";

function MessageComponent({
  message,
  isOpen,
  type = requiredParameter("Alert type")
}) {
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
