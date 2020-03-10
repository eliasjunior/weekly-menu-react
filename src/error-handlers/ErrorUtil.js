//TODO remove
export function getErrorFromResponse(reason) {
  const response = reason["response"];
  if (response && response.status === 404) {
    console.log("return 404");
    return Promise.reject({ message: "Not Found" });
  } else {
    const error = reason.response ? reason.response.data : reason;
    return Promise.reject(error);
  }
}
