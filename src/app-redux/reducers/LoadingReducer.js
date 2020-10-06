import { IS_LOADING } from "app-redux/actions/LoadingAction";

export default function (state = { isLoading: false }, { type, payload = {} }) {
  const { isLoading } = payload;
  switch (type) {
    case IS_LOADING:
      return { isLoading };
    default:
      return state;
  }
}
