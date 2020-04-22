export const PLUS_ONE = "PLUS_ONE";
export const MINUS_ONE = "MINUS_ONE";

export function increaseQdy(prodId, value) {
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
