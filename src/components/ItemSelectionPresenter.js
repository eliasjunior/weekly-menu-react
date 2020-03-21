import { recipeClickAction } from "app-redux/actions/RecipeAction";
export function getChecked(recipeProds, prodId) {
  return (
    recipeProds.filter(recProd => recProd.prodId && recProd.prodId === prodId)
      .length > 0
  );
}
export function handleOnChange({ dispatch, prodId, name }) {
  dispatch(recipeClickAction({ prodId, name }));
}
