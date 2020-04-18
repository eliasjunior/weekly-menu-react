export const PLUS_ONE = "PLUS_ONE";
export const MINUS_ONE = "MINUS_ONE";

export function plusOne(prodId) {
  return {
    type: PLUS_ONE,
    payload: {
      prodId,
    },
  };
}

export function minusOne(prodId) {
  return {
    type: MINUS_ONE,
    payload: {
      prodId,
    },
  };
}
