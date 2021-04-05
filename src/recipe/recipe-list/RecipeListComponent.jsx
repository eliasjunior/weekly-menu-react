import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { RecipeHeaderItem } from "./RecipeHeaderItem";
import SearchName from "components/SearchName";
import { useSelector } from "react-redux";
import ProductList from "inventory/product/components/ProductList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));

function RecipeListComponent({ recipes, history }) {
  const { displayList } = useSelector((state) => state.listFilter);
  const classes = useStyles();

  const buildRecipeList = () => {
    if (!displayList.length) {
      return "No recipes";
    }
    return displayList.map((recipe, index) => {
      return (
        <div key={index + "__"}>
          <List key={recipe.id} className={classes.root}>
            <RecipeHeaderItem
              recipe={recipe}
              history={history}
            ></RecipeHeaderItem>
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
    <>
      <SearchName listDB={recipes}></SearchName>
      <List>{buildRecipeList()}</List>
    </>
  );
}

export default RecipeListComponent;
