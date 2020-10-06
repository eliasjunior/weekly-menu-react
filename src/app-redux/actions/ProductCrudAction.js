import Presenter from "inventory/presenter";
import { loadingSomething } from "./LoadingAction";
import { afterResquest, afterRequestError } from "./common";
import { updateCategoryAsync } from "app-redux/actions/InventoryActions";
import { requiredParameter, quantityMapper } from "common/Util";
import { addAllQtd, increaseQdy } from "./QuantityPickAction";

const { getProducts, postProduct, putProduct } = Presenter;

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export function fetchProducts(data) {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      products: data,
    },
  };
}

export function createProduct(product) {
  return {
    type: CREATE_PRODUCT,
    payload: { product },
  };
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    payload: { product },
  };
}

export function fetchProductsAsync() {
  return async (dispatch) => {
    try {
      const data = await getProducts();
      dispatch(fetchProducts(data));
      //There is a known issue, when refresh the page the quantity map is overwriten here in the edit recipe
      dispatch(addAllQtd(quantityMapper(data)));
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function updateProductAsync(product = requiredParameter("product")) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      await putProduct(product);
      dispatch(updateProduct(product));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}

export function createProductAsync(
  product = requiredParameter("product"),
  category = requiredParameter("category")
) {
  return async (dispatch) => {
    dispatch(loadingSomething(true));
    try {
      const data = await postProduct(product);
      product.id = data.id;
      dispatch(createProduct(data));
      // Category is connect with product, it make sense to update cat here as well
      category.catProds.push(product.id);
      dispatch(updateCategoryAsync(category));
      dispatch(increaseQdy(product.id, data.quantityDefault));
      afterResquest(dispatch);
    } catch (error) {
      afterRequestError(dispatch, error);
    }
  };
}
