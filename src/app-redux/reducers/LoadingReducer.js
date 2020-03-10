import { IS_LOADING } from "app-redux/actions/LoadingAction";

export default function(state = { isLoading: false }, action) {
  const { type, isLoading } = action;
  switch (type) {
    case IS_LOADING:
      return { isLoading };
    default:
      return state;
  }
}
