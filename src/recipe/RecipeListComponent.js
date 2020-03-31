import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { RecipeHeaderItem } from "./RecipeHeaderItem";
import PropTypes from "prop-types";
import SearchName from "components/SearchName";
import { useSelector } from "react-redux";

function RecipeListComponent(props) {
  const { displayList } = useSelector(state => state.listFilter);
  const { onSelectRecipe, recipes } = props;

  console.log(props);

  const buildRecipeList = () => {
    if (!displayList.length) {
      return "No recipes";
    }
    return displayList.map((recipe, index) => {
      return (
        <div key={index}>
          <List component="div" key={recipe.id}>
            <RecipeHeaderItem
              recipe={recipe}
              onSelectRecipe={onSelectRecipe}
            ></RecipeHeaderItem>
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
  onSelectedProd: PropTypes.func
};

export default RecipeListComponent;
