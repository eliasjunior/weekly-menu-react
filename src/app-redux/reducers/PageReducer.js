import { PAGE_LOCATION, PAGE_TITLE } from "app-redux/actions/PageAction";
const initialState = { title: "Weekly Menu" };
export default function PageReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAGE_LOCATION:
      return { ...state, location: payload.location };
    case PAGE_TITLE:
      return { ...state, title: payload.title };
    default:
      return state;
  }
}
