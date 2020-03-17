export const PRODUCT_EDIT = "PRODUCT_EDIT";
export const PRODUCT_VIEW = "PRODUCT_VIEW";
export const PRODUCT_SELECT = "PRODUCT_SELECT";

export const FORM_VIEW_EDIT = "FORM_VIEW_EDIT";
export const FORM_VIEW_LABEL = "FORM_VIEW_LABEL";
export const BTN_EDIT_MODE = "BTN_EDIT_MODE";
export const BTN_VIEW_MODE = "BTN_VIEW_MODE";
export const PROD_SELECTION = "PROD_SELECTION";

export function formViewAction() {
  return {
    type: PRODUCT_VIEW
  };
}

export function formEditAction() {
  return {
    type: PRODUCT_EDIT
  };
}
