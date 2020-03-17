export const PRODUCT_EDIT = "PRODUCT_EDIT";
export const PRODUCT_DISPLAY = "PRODUCT_DISPLAY";
export const PRODUCT_SELECT = "PRODUCT_SELECT";

export const FORM_VIEW_EDIT = "FORM_VIEW_EDIT";
export const FORM_VIEW_LABEL = "FORM_VIEW_LABEL";
export const BTN_EDIT = "BTN_EDIT";
export const BTN_DELETE = "BTN_DELETE";

export const FORM_COMPONENTS_IDS = [
  "PROD_SELECTION",
  "FORM_VIEW_EDIT",
  "FORM_VIEW_LABEL",
  "BTN_EDIT",
  "BTN_DELETE"
];

export function formProductAction(page) {
  return {
    type: PRODUCT_EDIT,
    page
  };
}
