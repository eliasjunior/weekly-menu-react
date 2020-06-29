import { MESSAGE_TYPE_ERROR } from "app-redux/actions/AlertHandlerAction";

export function ErrorMapper(response = {}) {
  if (!response.status) {
    return {
      message: "Application view error",
      type: MESSAGE_TYPE_ERROR,
    };
  }
  const { status, statusText } = response;
  let diplayMessage = "";
  if (statusText === "" || !statusText) {
    diplayMessage = grapMessage(response);
  }

  switch (status) {
    case 404:
      return {
        message: "Attempt to reach the server, not found",
        type: MESSAGE_TYPE_ERROR,
      };
    case 500:
      return {
        message: diplayMessage,
        type: MESSAGE_TYPE_ERROR,
      };
    default:
      return {
        message: "Server Error server code=" + status,
        type: MESSAGE_TYPE_ERROR,
      };
  }
}

function grapMessage(response) {
  const { data } = response;

  if (data.message) {
    return data.message;
  }

  return "Some error ocurrer but app could not read the message from the server";
}
