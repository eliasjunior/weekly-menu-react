import React from "react";
import { List } from "@material-ui/core";
import { RecipeHeaderItem } from "./RecipeHeaderItem";
import SearchName from "components/SearchName";
import { useSelector } from "react-redux";
import ProductList from "inventory/product/components/ProductList";

function RecipeListComponent({ recipes }) {
  const { displayList } = useSelector((state) => state.listFilter);

  const buildRecipeList = () => {
    if (!displayList.length) {
      return "No recipes";
    }
    return displayList.map((recipe, index) => {
      return (
        <div key={index + "__"}>
          <List component="div" key={recipe.id}>
            <RecipeHeaderItem recipe={recipe}></RecipeHeaderItem>
          </List>
          <ProductList
            key={index + "_"}
            products={recipe.products}
          ></ProductList>
        </div>
      );
    });
  };
  return (
    <div>
      <SearchName listDB={recipes}></SearchName>
      <List>{buildRecipeList()}</List>
    </div>
  );
}

export default RecipeListComponent;
