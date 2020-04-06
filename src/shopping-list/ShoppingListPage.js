import React from "react";
import { AppWeekBar } from "../header/AppWeekBar";
import ShoppingCreateActions from "./ShoppingCreateActions";
import UtilCollectionService from "../service/UtilCollectionService";
import CommonErrorBoundary from "../error-handlers/CommonErrorBoundary";
import { ShoppingListUtilService } from "./ShoppingListUtilService";
import CloneDeep from "lodash.clonedeep";
import ShoppingListService from "./ShoppingListService";
import { RecipeBox } from "./RecipesBox";
import { ProductBox } from "./ProductBox";
const CategoryService = {};

class ShoppingListPage extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    this.state = {
      id,
      categories: [],
      selectedProducts: [],
      recipesToInclude: CloneDeep(props.recipesToInclude),
      title: id ? updateTitle : "New Shopping list",
    };
    this.saveShoppingList = this.saveShoppingList.bind(this);
    this.selectedProd = this.selectedProd.bind(this);
    this.selectAllProd = this.selectAllProd.bind(this);
    this.selectAllProdOfCatRec = this.selectAllProdOfCatRec.bind(this);
  }
  componentDidMount() {
    CategoryService.get()
      .then((categories) => {
        // TODO for update list I can't add another recipe at the moment
        // I need to merge this.props.shoppingList.recipes with this.props.recipesToInclude
        if (this.props.shoppingList) {
          const shoppingList = this.props.shoppingList;
          const existingCats = CloneDeep(shoppingList.categories);

          const requestedCats = UtilCollectionService.refreshSelectedItemsShopList(
            existingCats,
            categories
          );

          this.setState({
            recipesToInclude: shoppingList.recipes,
            categories: requestedCats,
          });
        } else {
          // edit items recipesToInclude
          this.setState({
            categories,
            recipesToInclude: this.props.recipesToInclude,
          });
        }
      })
      .catch((reason) => {
        this.props.onHandleMessage({ message: reason.message });
      });
  }
  saveShoppingList() {
    const catsSelected = UtilCollectionService.getCategorySelected(
      this.state.categories
    );
    if (this.state.id) {
      const shoppintList = buildObjectToSend(
        catsSelected,
        this.state.recipesToInclude,
        this.state.id
      );

      ShoppingListService.update(shoppintList)
        .then(() => {
          this.props.onHandleMessage({
            message: "Uhhuu Shopping list updated",
            type: "success",
          });
        })
        .catch((reason) =>
          this.props.onHandleMessage({ message: reason.message })
        );
    } else {
      const shoppintList = buildObjectToSend(
        catsSelected,
        this.state.recipesToInclude
      );

      ShoppingListService.save(shoppintList)
        .then((response) => {
          this.setState({
            id: response._id,
            title: updateTitle,
          });
          this.props.onHandleMessage({
            message: "Uhhuu Shopping list saved",
            type: "success",
          });
        })
        .catch((reason) =>
          this.props.onHandleMessage({ message: reason.message })
        );
    }
  }
  selectedProdRecipe(selected) {
    const recipesToInclude = ShoppingListUtilService.updateRecipesSelection(
      this.state.recipesToInclude,
      selected
    );

    this.setState({ recipesToInclude });
  }
  selectAllProdOfCatRec(selected) {
    const recipesToInclude = CloneDeep(this.state.recipesToInclude);
    const recipeIn = recipesToInclude.find((rec) => rec._id === selected.recId);

    recipeIn.categories = UtilCollectionService.updateProductsSelection(
      recipeIn.categories,
      selected
    );

    this.setState({ recipesToInclude });
  }
  selectedProd(selected) {
    const categories = UtilCollectionService.updateProductSelection(
      this.state.categories,
      selected
    );

    this.setState({ categories });
  }
  selectAllProd(selected) {
    const categories = UtilCollectionService.updateProductsSelection(
      this.state.categories,
      selected
    );
    this.setState({ categories });
  }
  render() {
    return (
      <div>
        <CommonErrorBoundary>
          <AppWeekBar title={this.state.title}></AppWeekBar>
          <ShoppingCreateActions
            onSaveShoppingList={this.saveShoppingList}
          ></ShoppingCreateActions>
          <RecipeBox
            recipesToInclude={this.state.recipesToInclude}
            onSelectedProdRecipe={this.selectedProdRecipe}
            onSelectAllProdOfCatRec={this.selectAllProdOfCatRec}
          ></RecipeBox>
          <ProductBox
            list={this.state.categories}
            onSelectedProd={this.selectedProd}
            onSelectAllProd={this.selectAllProd}
          ></ProductBox>
        </CommonErrorBoundary>
      </div>
    );
  }
}
const updateTitle = "Update Shopping list";

function buildObjectToSend(categories, recipesToInclude, id) {
  const recipes = UtilCollectionService.getCatsSelectedInRecipes(
    recipesToInclude
  );
  if (id) {
    return {
      categories: categories,
      recipes,
      _id: id,
    };
  } else {
    return {
      categories: categories,
      recipes,
    };
  }
}

export default ShoppingListPage;
