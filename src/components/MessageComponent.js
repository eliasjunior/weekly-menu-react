import React from "react";
import SnackMessage from "./SnackMessage";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { red, green } from "@material-ui/core/colors";
import { closeMessage } from "app-redux/actions/ErrorHandlerAction";
import { useDispatch } from "react-redux";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
const MESSAGE_TYPE = {
  SUCCESS: "success",
  ERROR: "error"
};
const styles = {
  error: {
    snackContent: {
      backgroundColor: red[400],
      margin: "5px"
    }
  },
  success: {
    snackContent: {
      backgroundColor: green[400],
      margin: "5px"
    }
  }
};

function MessageComponent({ message, isOpen, type }) {
  const dispatch = useDispatch();
  if (!message) {
    return null;
  }
  const renderMessage = () => {
    if (type !== MESSAGE_TYPE.SUCCESS) {
      return messageAttrs(
        message,
        variantIcon[MESSAGE_TYPE.ERROR],
        styles.error
      );
    } else {
      return messageAttrs(
        message,
        variantIcon[MESSAGE_TYPE.SUCCESS],
        styles.success
      );
    }
  };
  const messageAttrs = (messageValue, iconVariant, theme) => {
    const handleClose = () => {
      dispatch(closeMessage());
    };
    return (
      <SnackMessage
        icon={iconVariant}
        message={messageValue}
        onClose={handleClose}
        open={isOpen}
        styles={theme}
      />
    );
  };

  return <div>{renderMessage()}</div>;
}

export default MessageComponent;
