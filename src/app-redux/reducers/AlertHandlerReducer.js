import {
  SUCCESS_MESSAGE,
  CLOSE_MESSAGE,
  INFO_MESSAGE
} from "../actions/AlertHandlerAction";

export default function AlertReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SUCCESS_MESSAGE:
    case INFO_MESSAGE:
      return { ...payload };
    case CLOSE_MESSAGE:
      return {
        message: ""
      };
    default:
      return state;
  }
}
