import CommonValidator from "common/CommonValidator";
import { requiredParameter } from "common/Util";
export const PLUS_ONE = "PLUS_ONE";
export const MINUS_ONE = "MINUS_ONE";
export const ADD_MAP = "ADD_MAP";
export const RESET_QDY_MAP = "RESET_QDY_MAP";

export function increaseQdy(
  prodId,
  value = requiredParameter("value from increase qtd")
) {
  return {
    type: PLUS_ONE,
    payload: {
      prodId,
      value,
    },
  };
}

export function decreaseQty(prodId, value) {
  return {
    type: MINUS_ONE,
    payload: {
      prodId,
      value,
    },
  };
}

export function addAllQtd(quantityMap) {
  const invalidKeys =
    Object.keys(quantityMap).filter((id) => !quantityMap[id]) > 0;

  if (invalidKeys.length > 0) {
    throw new CommonValidator(
      `Quantity map has invalid keys with no values ${invalidKeys}`
    );
  }
  return {
    type: ADD_MAP,
    payload: { quantityMap },
  };
}

export function resetQty(productMap) {
  return {
    type: RESET_QDY_MAP,
    payload: { productMap },
  };
}
