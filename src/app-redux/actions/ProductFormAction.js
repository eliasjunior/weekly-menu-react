export const PRODUCT_EDIT_VIEW = "PRODUCT_EDIT_VIEW";
export const PRODUCT_SELECTION_VIEW = "PRODUCT_SELECTION_VIEW";
export const PROD_PICKING_VIEW = "PROD_PICKING_VIEW";
export const PROD_SHOPPING_LIST_VIEW = "PROD_SHOPPING_LIST_VIEW";

export const PROD_LABEL = "PROD_LABEL";

export const BTN_CRUD = "PRODUCT_CRUD";
export const BTN_SELECTION = "BTN_SELECTION";
export const BTN_SHOPPING_SELECTION = "BTN_SHOPPING_SELECTION";
export const BTN_PICK_PROD = "BTN_PICK_PROD";
export const BTN_QDT_INFO = "BTN_QDT_INFO";

export function formEditAction() {
  return {
    type: PRODUCT_EDIT_VIEW,
  };
}
export function formSelectionAction() {
  return {
    type: PRODUCT_SELECTION_VIEW,
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
