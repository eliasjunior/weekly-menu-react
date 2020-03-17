import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { RecipeHeaderItem } from "./RecipeHeaderItem";
import CategoryList from "../inventory/category/components";
import PropTypes from "prop-types";
import IconRecipe from "@material-ui/icons/Receipt";
import CloneDeep from "lodash.clonedeep";
import SearchName from "components/SearchName";
import { purple } from "@material-ui/core/colors";
import CategoryListUtil from "../inventory/category/helpers/CategoryListUtil";
import RecipeListUtil from "./RecipeListUtil";
class RecipeListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      recipes: props.recipes
    };
  }
  componentDidUpdate(prevProps) {
    let hasChanged = false;
    const { recipes: prevRecipes } = prevProps;
    const { recipes } = this.props;
    let i = 0;
    while (!hasChanged && prevRecipes.length > i) {
      const _recPrev = prevRecipes[i];
      const prevList = _recPrev.categories;
      const categories = RecipeListUtil.getCatsFromProps(recipes, _recPrev._id);

      hasChanged = CategoryListUtil.isListChanged(
        prevList,
        categories,
        "checked"
      );
      i++;
    }
    if (prevProps.recipes.length !== recipes.length || hasChanged) {
      this.setState({ recipes });
    }
  }
  buildRecipeList = () => {
    const {
      isNotEditable,
      isRecipeNotSelectable,
      onSelectRecipe,
      onSelectedProd,
      onSelectAllProdOfCatRec,
      parentComponent
    } = this.props;

    const { recipes } = this.state;

    if (recipes.length) {
      return recipes.map((recipe, index) => {
        return (
          <div key={index}>
            <List component="div" disablePadding key={recipe._id}>
              <RecipeHeaderItem
                recipe={recipe}
                isNotEditable={isNotEditable}
                isRecipeNotSelectable={isRecipeNotSelectable}
                onSelectRecipe={onSelectRecipe}
              ></RecipeHeaderItem>
            </List>
            <CategoryList
              list={recipe.categories}
              onSelectedProd={onSelectedProd}
              onSelectAllProd={selectedCategory => {
                const withRecipe = { ...selectedCategory, recId: recipe._id };
                onSelectAllProdOfCatRec(withRecipe);
              }}
              parentComponent={parentComponent}
              searchTitle={`Search Product In ${recipe.name}`}
            ></CategoryList>
          </div>
        );
      });
    } else {
      return "";
    }
  };
  // TODO do like in category, add to a service
  isTitleDisplay = () => {
    const { title, recipes } = this.props;

    if (title && recipes.length) {
      return (
        <List>
          <ListItem style={{ backgroundColor: purple[300] }}>
            <ListItemIcon>
              <IconRecipe />
            </ListItemIcon>
            <ListItemText primary={title}></ListItemText>
          </ListItem>
        </List>
      );
    } else return "";
  };
  handleChange = e => {
    const { recipes } = this.props;
    const value = e.target.value;

    if (value === "") {
      this.resetSearch();
      return;
    }
    const recipesFiltered = CloneDeep(recipes).filter(
      rec => rec.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    this.setState({
      search: value,
      recipes: recipesFiltered
    });
  };
  resetSearch = () => {
    this.setState({
      search: "",
      recipes: this.props.recipes
    });
  };
  render() {
    return (
      <div>
        {this.isTitleDisplay()}
        <SearchName
          onSearch={this.state.search}
          onChangeName={this.handleChange}
          onResetSearch={this.resetSearch}
          searchTitle="Search Recipe"
        ></SearchName>
        <List>{this.buildRecipeList()}</List>
      </div>
    );
  }
}

RecipeListComponent.propTypes = {
  title: PropTypes.string,
  recipes: PropTypes.array,
  onSelectRecipe: PropTypes.func,
  onSelectedProd: PropTypes.func
};

export default RecipeListComponent;
