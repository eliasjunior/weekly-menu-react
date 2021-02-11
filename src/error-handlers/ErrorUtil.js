import { MESSAGE_TYPE_ERROR } from "app-redux/actions/AlertHandlerAction";
import {isEmpty} from "../common/Util";

export function ErrorMapper(response = {}) {
  if (!response.status) {
    console.warn(
      "Response object  seems not to have status, check request obj return"
    );
    return {
      message: "Application view error",
      type: MESSAGE_TYPE_ERROR,
    };
  }
  const { status, statusText } = response;
  let displayMessage = "";
  if (isEmpty(statusText)) {
    displayMessage = grabMessage(response);
  }
  switch (status) {
    case 404:
      return {
        message: "Attempt to reach the server, not found",
        type: MESSAGE_TYPE_ERROR,
      };
    case 500:
      return {
        message: displayMessage,
        type: MESSAGE_TYPE_ERROR,
      };
    default:
      return {
        message: "Server Error server code=" + status,
        type: MESSAGE_TYPE_ERROR,
      };
  }
}

function grabMessage(response = {}) {
  const { data = {}} = response;

  if (data.message) {
    return data.message;
  }

  return "Some error occur but app could not read the message from the server";
}
