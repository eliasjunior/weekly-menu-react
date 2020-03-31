import { successMessage, httpError } from "./AlertHandlerAction";
import { loadingSomething } from "./LoadingAction";

export function afterResquest(dispatch) {
  dispatch(successMessage());
  dispatch(loadingSomething(false));
}

export function afterRequestError(dispatch, error) {
  //TODO review here, if error occurs on the redux flow make sure to print it
  console.error("afterRequestError", error);
  dispatch(httpError(error));
  dispatch(loadingSomething(false));
}
