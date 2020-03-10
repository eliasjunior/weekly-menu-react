export const IS_LOADING = "IS_LOADING";

export function loadingSomething(isLoading) {
  return {
    type: IS_LOADING,
    isLoading
  };
}
