import React from "react";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
export default function() {
  const { message, type } = useSelector(state => state.alertHandler);
  return message ? (
    <MessageComponent
      message={message}
      isOpen={message ? true : false}
      type={type}
    ></MessageComponent>
  ) : (
    ""
  );
}
