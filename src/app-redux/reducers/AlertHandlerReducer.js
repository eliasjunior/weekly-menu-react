import { SUCCESS_MESSAGE, CLOSE_MESSAGE } from "../actions/AlertHandlerAction";

export default function(state = {}, action) {
  const { type, message } = action;
  switch (type) {
    case SUCCESS_MESSAGE:
      return {
        message
      };
    case CLOSE_MESSAGE:
      return {
        message: ""
      };
    default:
      return state;
  }
}
