import {
  PRODUCT_EDIT,
  PRODUCT_VIEW,
  FORM_VIEW_EDIT,
  FORM_VIEW_LABEL,
  BTN_EDIT_MODE,
  BTN_VIEW_MODE
} from "app-redux/actions/FormProductAction";

const initialState = [FORM_VIEW_LABEL];

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case PRODUCT_VIEW:
      return [FORM_VIEW_LABEL, BTN_VIEW_MODE];
    case PRODUCT_EDIT:
      return [FORM_VIEW_EDIT, BTN_EDIT_MODE];
    default:
      return state;
  }
}
