import React from "react";
import { Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addProdsRecipe } from "app-redux/actions/CartAction";

export function RecipeSelection({ recipe }) {
  const dispatch = useDispatch();
  const productMap = useSelector((state) => state.products);
  const recipeSelected = useSelector(
    (state) => state.cart.recipes.byId[recipe.id]
  );
  const checked = recipeSelected !== undefined;

  return (
    <Checkbox
      onChange={() =>
        dispatch(
          addProdsRecipe({
            recId: recipe.id,
            prods: recipe.prodsDetail.map((detail) => ({
              id: detail.id,
              catId: productMap.byId[detail.id].catId,
            })),
            checked,
          })
        )
      }
      checked={checked}
      value={recipe.name}
    ></Checkbox>
  );
}
