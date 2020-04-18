export const PRODUCT_EDIT = "PRODUCT_EDIT";
export const PRODUCT_VIEW = "PRODUCT_VIEW";
export const PRODUCT_SELECTION = "PRODUCT_SELECTION";
export const PROD_PICKING_VIEW = "PROD_PICKING_VIEW";
export const PROD_SHOPPING_LIST_VIEW = "PROD_SHOPPING_LIST_VIEW";

export const FORM_VIEW_EDIT = "FORM_VIEW_EDIT";
export const FORM_VIEW_LABEL = "FORM_VIEW_LABEL";

export const BTN_EDIT_MODE = "BTN_EDIT_MODE";
export const BTN_VIEW_MODE = "BTN_VIEW_MODE";
export const BTN_SELECTION = "BTN_SELECTION";
export const BTN_PICK_PROD = "BTN_PICK_PROD";
export const BTN_QDT_INFO = "BTN_QDT_INFO";

export function formViewAction() {
  return {
    type: PRODUCT_VIEW,
  };
}

export function formEditAction() {
  return {
    type: PRODUCT_EDIT,
  };
}

export function formSelectionAction() {
  return {
    type: PRODUCT_SELECTION,
  };
}

export function formPickAction() {
  return {
    type: PROD_PICKING_VIEW,
  };
}

export function formShoppingAction() {
  return {
    type: PROD_SHOPPING_LIST_VIEW,
  };
}
