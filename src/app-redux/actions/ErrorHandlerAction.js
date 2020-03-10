export const HTTP_ERROR = "HTTP_ERROR";
export const CLOSE_MESSAGE = "CLOSE_MESSAGE";

export function httpError(response) {
  const validResponse = ErrorMapper(response);
  return {
    type: HTTP_ERROR,
    response: validResponse
  };
}

export function closeMessage() {
  return {
    type: CLOSE_MESSAGE
  };
}

//TODO move to usecases
function ErrorMapper(response = {}) {
  const { status, statusText, data } = response;
  return {
    status,
    data,
    message: statusText,
    type: status !== 200 ? "error" : "success"
  };
}
