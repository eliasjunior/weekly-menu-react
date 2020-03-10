export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const CLOSE_MESSAGE = "CLOSE_MESSAGE";

export function successMessage() {
  return {
    type: SUCCESS_MESSAGE,
    message: "Congratulations! you made it!"
  };
}
