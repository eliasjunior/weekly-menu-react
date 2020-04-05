import { recipeClickAction } from "app-redux/actions/RecipeAction";
export function getChecked(products, prodId) {
  return (
    products.filter(recProd => recProd.id && recProd.id === prodId).length > 0
  );
}
export function handleOnChange({ dispatch, product }) {
  dispatch(recipeClickAction({ product }));
}
