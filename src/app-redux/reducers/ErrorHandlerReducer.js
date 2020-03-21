import { HTTP_ERROR } from "../actions/ErrorHandlerAction";

export default function ErrorHandlerReducer(state = {}, action) {
  const { type, response } = action;
  switch (type) {
    case HTTP_ERROR:
      return validateErrorCode(response);
    default:
      return state;
  }
}

//TODO move to usecase or helper, error-handler ?
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
        message: "Server Error server code=" + status,
        response
      };
  }
}
