import { HTTP_ERROR, CLOSE_MESSAGE } from "../actions/ErrorHandlerAction";

export default function ErrorHandlerReducer(state = {}, action) {
  const { type, response } = action;
  switch (type) {
    case HTTP_ERROR:
      return validateErrorCode(response);
    case CLOSE_MESSAGE:
      return {
        message: ""
      };
    default:
      return state;
  }
}

function validateErrorCode({ status, response, message }) {
  switch (status) {
    case 404:
      return { message: "Not Found" };
    case 500:
      return {
        message,
        response
      };
    default:
      return {
        message: "Server Error",
        response
      };
  }
}
