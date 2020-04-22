import {
  PLUS_ONE as INCREASE_VALUE,
  MINUS_ONE as DECREASE_VALUE,
} from "app-redux/actions/QuantityPickAction";
import { requiredParameter } from "common/Util";

const initialState = {};

export default function QuantityPickReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INCREASE_VALUE:
      if (!payload.prodId) {
        requiredParameter("prodId plus");
      }
      const currentValue = state[payload.prodId];
      if (currentValue) {
        state[payload.prodId] = currentValue + payload.value;
      } else {
        state[payload.prodId] = payload.value * 2;
      }
      return { ...state };
    case DECREASE_VALUE:
      if (!payload.prodId) {
        requiredParameter("prodId minus");
      }
      const value2 = state[payload.prodId];
      if (value2 && value2 > payload.value) {
        state[payload.prodId] = value2 - payload.value;
      } else {
        state[payload.prodId] = payload.value;
      }
      return { ...state };
    default:
      return state;
  }
}
