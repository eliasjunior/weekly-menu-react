import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { RecipeHeaderItem } from "./RecipeHeaderItem";
import PropTypes from "prop-types";
import SearchName from "components/SearchName";
import { useSelector } from "react-redux";

function RecipeListComponent({ recipes }) {
  const { displayList } = useSelector((state) => state.listFilter);

  console.log("displayList ", displayList);

  const buildRecipeList = () => {
    if (!displayList.length) {
      return "No recipes";
    }
    return displayList.map((recipe, index) => {
      return (
        <div key={index}>
          <List component="div" key={recipe.id}>
            <RecipeHeaderItem recipe={recipe}></RecipeHeaderItem>
          </List>
          {recipe.products.map((prod, index) => {
            return (
              <ListItem key={index}>
                <ListItemText>{prod.name}</ListItemText>
              </ListItem>
            );
          })}
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

RecipeListComponent.propTypes = {
  title: PropTypes.string,
  onSelectRecipe: PropTypes.func,
  onSelectedProd: PropTypes.func,
};

export default RecipeListComponent;
