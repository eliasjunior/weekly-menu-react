import { successMessage, httpError } from "./AlertHandlerAction";
import { loadingSomething } from "./LoadingAction";

export function afterRequest(dispatch) {
  dispatch(successMessage());
  dispatch(loadingSomething(false));
}

export function afterRequestError(dispatch, error) {
  console.error("afterRequestError", error);
  dispatch(httpError(error));
  dispatch(loadingSomething(false));
}
