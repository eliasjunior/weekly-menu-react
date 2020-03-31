import { MESSAGE_TYPE_ERROR } from "app-redux/actions/AlertHandlerAction";

export function ErrorMapper(response = {}) {
  if (!response.status) {
    return {
      message: "Application view error",
      type: MESSAGE_TYPE_ERROR
    };
  }
  const { status, statusText } = response;

  switch (status) {
    case 404:
      return {
        message: "Attempt to reach the server, not found",
        type: MESSAGE_TYPE_ERROR
      };
    case 500:
      return {
        message: statusText,
        type: MESSAGE_TYPE_ERROR
      };
    default:
      return {
        message: "Server Error server code=" + status,
        type: MESSAGE_TYPE_ERROR
      };
  }
}
