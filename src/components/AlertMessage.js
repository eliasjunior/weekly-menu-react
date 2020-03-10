import React from "react";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
export default function() {
  const message = useSelector(state => state.alertHandler.message);
  console.log("hide ", message);
  return message ? (
    <MessageComponent
      message={message}
      isOpen={message ? true : false}
      type="success"
    ></MessageComponent>
  ) : (
    ""
  );
}
