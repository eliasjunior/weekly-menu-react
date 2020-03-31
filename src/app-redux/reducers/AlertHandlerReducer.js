import {
  SUCCESS_MESSAGE,
  CLOSE_MESSAGE,
  INFO_MESSAGE,
  HTTP_ERROR
} from "../actions/AlertHandlerAction";

export default function AlertReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case SUCCESS_MESSAGE:
    case INFO_MESSAGE:
    case HTTP_ERROR:
      return { ...payload };
    case CLOSE_MESSAGE:
      return {
        message: ""
      };
    default:
      return state;
  }
}
