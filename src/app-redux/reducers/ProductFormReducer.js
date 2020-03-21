import {
  PRODUCT_EDIT,
  PRODUCT_VIEW,
  PRODUCT_SELECTION,
  FORM_VIEW_EDIT,
  FORM_VIEW_LABEL,
  BTN_EDIT_MODE,
  BTN_VIEW_MODE,
  BTN_SELECTION
} from "app-redux/actions/ProductFormAction";

const initialState = [FORM_VIEW_LABEL];

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case PRODUCT_VIEW:
      return [FORM_VIEW_LABEL, BTN_VIEW_MODE];
    case PRODUCT_EDIT:
      return [FORM_VIEW_EDIT, BTN_EDIT_MODE];
    case PRODUCT_SELECTION:
      return [BTN_SELECTION, FORM_VIEW_LABEL];
    default:
      return state;
  }
}
