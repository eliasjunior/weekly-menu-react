import React from "react";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
import CommonErrorBoundary from "error-handlers/CommonErrorBoundary";
export default function() {
  const { message, type } = useSelector(state => state.alertHandler);
  return message ? (
    //TODO test error boundary, remove type from ErrorMapper and debug
    <CommonErrorBoundary>
      <MessageComponent
        message={message}
        isOpen={message ? true : false}
        type={type}
      ></MessageComponent>
    </CommonErrorBoundary>
  ) : (
    ""
  );
}
