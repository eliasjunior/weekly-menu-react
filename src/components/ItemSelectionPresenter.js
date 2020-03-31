import { recipeClickAction } from "app-redux/actions/RecipeAction";
export function getChecked(products, prodId) {
  return (
    products.filter(recProd => recProd.id && recProd.id === prodId).length > 0
  );
}
export function handleOnChange({ dispatch, id, name }) {
  dispatch(recipeClickAction({ id, name }));
}
