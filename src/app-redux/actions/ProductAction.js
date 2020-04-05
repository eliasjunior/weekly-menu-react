// import { getProducts } from "service/TemporaryAPI";
// import { afterRequestError } from "./common";

// export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

// export function fetchProducts(data) {
//   return {
//     type: FETCH_PRODUCTS,
//     payload: {
//       products: data
//     }
//   };
// }

// export function fetchProductsAsync() {
//   return async dispatch => {
//     try {
//       //TODO review here if we add this to the presenter
//       const data = await getProducts();
//       dispatch(fetchProducts(data));
//     } catch (error) {
//       afterRequestError(dispatch, error);
//     }
//   };
// }
