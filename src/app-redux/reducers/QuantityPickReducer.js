import { PLUS_ONE, MINUS_ONE } from "app-redux/actions/QuantityPickAction";
import { requiredParameter } from "common/Util";

const initialState = {};

export default function QuantityPickReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PLUS_ONE:
      if (!payload.prodId) {
        requiredParameter("prodId plus");
      }
      const value = state[payload.prodId];
      if (value) {
        state[payload.prodId] = value + 1;
      } else {
        state[payload.prodId] = 2;
      }
      return state;
    case MINUS_ONE:
      if (!payload.prodId) {
        requiredParameter("prodId minus");
      }
      const value2 = state[payload.prodId];
      if (value2 && value2 > 1) {
        state[payload.prodId] = value2 - 1;
      } else {
        state[payload.prodId] = 1;
      }
      return state;
    default:
      return state;
  }
}
