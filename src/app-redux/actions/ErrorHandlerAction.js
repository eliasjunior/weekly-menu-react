export const HTTP_ERROR = "HTTP_ERROR";

export function httpError(response) {
  const validResponse = ErrorMapper(response);
  return {
    type: HTTP_ERROR,
    response: validResponse
  };
}

//TODO move to usecases
function ErrorMapper(response = {}) {
  if (!response.status || !statusText) {
    console.error(response);
    return {
      message: "Application view error",
      data: null,
      type: "error"
    };
  }
  const { status, statusText, data } = response;
  return {
    status,
    data,
    message: statusText,
    type: status !== 200 ? "error" : "success"
  };
}
