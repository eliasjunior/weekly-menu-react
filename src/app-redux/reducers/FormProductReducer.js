import {
  PRODUCT_DISPLAY,
  PRODUCT_SELECT,
  FORM_COMPONENTS_IDS,
  PRODUCT_EDIT
} from "app-redux/actions/FormProductAction";

const initialState = [
  FORM_COMPONENTS_IDS[0],
  FORM_COMPONENTS_IDS[1],
  FORM_COMPONENTS_IDS[3],
  FORM_COMPONENTS_IDS[4]
];

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case PRODUCT_EDIT:
      return [
        FORM_COMPONENTS_IDS[0],
        FORM_COMPONENTS_IDS[1],
        FORM_COMPONENTS_IDS[3],
        FORM_COMPONENTS_IDS[4]
      ];
    default:
      return state;
  }
}
