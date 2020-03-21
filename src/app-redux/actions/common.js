import { successMessage } from "./AlertHandlerAction";
import { loadingSomething } from "./LoadingAction";
import { httpError } from "./ErrorHandlerAction";

export function afterResquest(dispatch) {
  dispatch(successMessage());
  dispatch(loadingSomething(false));
}

export function afterRequestError(dispatch, error) {
  dispatch(httpError(error));
  dispatch(loadingSomething(false));
}
