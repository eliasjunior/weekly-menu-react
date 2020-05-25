import {
  PRODUCT_EDIT_VIEW,
  PRODUCT_SELECTION_VIEW,
  PROD_LABEL,
  BTN_CRUD,
  BTN_SELECTION,
  BTN_PICK_PROD,
  BTN_QDT_INFO,
  PROD_PICKING_VIEW,
  PROD_SHOPPING_LIST_VIEW,
  BTN_SHOPPING_SELECTION,
} from "app-redux/actions/ProductFormAction";

const initialState = [PROD_LABEL];

export default function ProductFormReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case PRODUCT_EDIT_VIEW:
      return [PROD_LABEL, BTN_CRUD];
    case PRODUCT_SELECTION_VIEW:
      return [BTN_SELECTION, PROD_LABEL, BTN_PICK_PROD];
    case PROD_PICKING_VIEW:
      return [BTN_SHOPPING_SELECTION, PROD_LABEL, BTN_PICK_PROD];
    case PROD_SHOPPING_LIST_VIEW:
      return [BTN_QDT_INFO];
    default:
      return state;
  }
}
