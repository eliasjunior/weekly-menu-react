import { ErrorMapper } from "error-handlers/ErrorUtil";

export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const CLOSE_MESSAGE = "CLOSE_MESSAGE";
export const INFO_MESSAGE = "INFO_MESSAGE";
export const HTTP_ERROR = "HTTP_ERROR";

export const MESSAGE_TYPE_SUCCESS = "MESSAGE_TYPE_SUCCESS";
export const MESSAGE_TYPE_ERROR = "MESSAGE_TYPE_ERROR";
export const MESSAGE_TYPE_INFO = "MESSAGE_TYPE_INFO";

export function successMessage(message = "Success!") {
  return {
    type: SUCCESS_MESSAGE,
    payload: {
      message,
      type: MESSAGE_TYPE_SUCCESS,
    },
  };
}

export function infoMessage(message = "Hey Hey!") {
  return {
    type: INFO_MESSAGE,
    payload: {
      message,
      type: MESSAGE_TYPE_INFO,
    },
  };
}

export function closeMessage() {
  return {
    type: CLOSE_MESSAGE,
  };
}

export function httpError(response) {
  const validResponse = ErrorMapper(response);
  return {
    type: HTTP_ERROR,
    payload: validResponse,
  };
}
