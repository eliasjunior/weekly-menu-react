import {
  PLUS_ONE as INCREASE_VALUE,
  MINUS_ONE as DECREASE_VALUE,
  ADD_MAP,
  RESET_QDY_MAP,
} from "app-redux/actions/QuantityPickAction";
import { requiredParameter } from "common/Util";

const initialState = {};

export default function QuantityPickReducer(state = initialState, action) {
  const { payload, type } = action;
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
    case ADD_MAP: {
      const { quantityMap } = payload;
      // merge then update
      const mergeKeys = (prev, key) => {
        // is current in the existing list
        const isIn = prev.filter((curKey) => curKey === key).length > 0;
        if (!isIn) {
          prev.push(key);
        }
        return prev;
      };
      const result = Object.keys(quantityMap)
        .reduce(mergeKeys, Object.keys(state))
        .reduce((prev, id) => {
          const qdtValue = quantityMap[id];
          if (qdtValue) {
            prev[id] = qdtValue;
          } else {
            prev[id] = state[id];
          }
          return prev;
        }, {});
      return result;
    }
    case RESET_QDY_MAP: {
      const { productMap } = payload;
      const { byId, allIds } = productMap;
      return allIds.reduce((prev, id) => {
        const prod = byId[id];
        prev[id] = prod.quantityDefault;
        return prev;
      }, {});
    }
    default:
      return state;
  }
}
