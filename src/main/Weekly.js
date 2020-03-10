import React from "react";
import { Route, Switch } from "react-router-dom";
import RecipePage from "recipe/recipe-form/RecipePage";
import RecipeListPage from "recipe/RecipeListPage";
import ShoppingListPage from "shopping-list/ShoppingListPage";
import InventoryPage from "inventory/InventoryPage";
import { AppConstant } from "common/AppConstant";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/orange";
import { MuiThemeProvider } from "@material-ui/core";
import UtilCollectionService from "service/UtilCollectionService";
import ShoppingListHistoryPage from "shopping-list/ShoppingListHistoryPage";
import ShoppingPage from "shopping-list/ShoppingPage";
import Dashboard from "dashboard/Dashboard";
import store from "../app-redux/store";
import { Provider } from "react-redux";
import ErrorHandlerMessage from "components/ErrorHandlerMessage";
import AlertMessage from "components/AlertMessage";
import Loading from "components/Loading";

class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesToInclude: [],
      appLocation: "dashboard",
      alert: {
        message: null,
        open: false
      }
    };
    this.callbackIncludeRecipe = this.callbackIncludeRecipe.bind(this);
    this.editShoppingList = this.editShoppingList.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  callbackIncludeRecipe(_recipeRow_) {
    if (_recipeRow_.checked) {
      const recipesToInclude = UtilCollectionService.addRecipe(
        _recipeRow_.recipe,
        this.state.recipesToInclude
      );
      this.setState({ recipesToInclude });

      console.log("add", _recipeRow_.recipe);
      console.log("list", recipesToInclude);
    } else {
      const recipesToInclude = UtilCollectionService.removeRecipe(
        _recipeRow_.recipe,
        this.state.recipesToInclude
      );
      this.setState({ recipesToInclude });

      console.log("remove", _recipeRow_.recipe);
    }
  }
  editShoppingList(shoppingList) {
    console.log("Update set", shoppingList);
    // TODO check about persist check flag
    shoppingList.recipes.forEach(recipe => {
      recipe.categories.forEach(cat => {
        cat.products.forEach(prod => (prod.checked = true));
      });
    });
    this.setState({ shoppingList });
  }
  handleMessage(alert) {
    let { message, type } = alert;
    this.setState({
      alert: {
        message,
        open: true,
        type
      }
    });
  }
  handleClose() {
    const alert = {
      message: "",
      open: false
    };
    this.setState({ alert });
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <ErrorHandlerMessage></ErrorHandlerMessage>
            <AlertMessage></AlertMessage>
            <Loading></Loading>
            <Route
              exact
              path={AppConstant.LOCATION.products.path}
              render={props => (
                <InventoryPage
                  {...props}
                  onHandleMessage={this.handleMessage}
                ></InventoryPage>
              )}
            ></Route>
            <Route
              exact
              path={AppConstant.LOCATION.dashboard.path}
              render={props => (
                <Dashboard
                  {...props}
                  onHandleMessage={this.handleMessage}
                ></Dashboard>
              )}
            ></Route>
            <Route
              path={AppConstant.LOCATION.shoppingHistory.path}
              render={props => (
                <ShoppingListHistoryPage
                  {...props}
                  onHandleMessage={this.handleMessage}
                  editShoppingList={this.editShoppingList}
                />
              )}
            ></Route>
            <Route
              path={`${AppConstant.LOCATION.shopping.path}/:id`}
              render={props => (
                <ShoppingPage
                  {...props}
                  shoppingList={this.state.shoppingList}
                  onHandleMessage={this.handleMessage}
                />
              )}
            ></Route>
            <Route
              path={AppConstant.LOCATION.recipeList.path}
              render={props => (
                <RecipeListPage
                  {...props}
                  callbackIncludeRecipe={this.callbackIncludeRecipe}
                />
              )}
            ></Route>
            <Route
              path={`${AppConstant.LOCATION.newShoppingList.path}`}
              render={props => (
                <ShoppingListPage
                  {...props}
                  onHandleMessage={this.handleMessage}
                  recipesToInclude={this.state.recipesToInclude}
                />
              )}
            ></Route>
            <Route
              path={`${AppConstant.LOCATION.editShoppingList.path}/:id`}
              render={props => (
                <ShoppingListPage
                  {...props}
                  onHandleMessage={this.handleMessage}
                  shoppingList={this.state.shoppingList}
                  recipesToInclude={this.state.recipesToInclude}
                />
              )}
            ></Route>
            <Switch>
              <Route
                path={`${AppConstant.LOCATION.newRecipe.path}/:id`}
                render={props => (
                  <RecipePage
                    {...props}
                    onHandleMessage={this.handleMessage}
                  ></RecipePage>
                )}
              ></Route>
              <Route
                path={AppConstant.LOCATION.newRecipe.path}
                render={props => (
                  <RecipePage
                    {...props}
                    onHandleMessage={this.handleMessage}
                  ></RecipePage>
                )}
              ></Route>
            </Switch>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: teal
  }
});

export default Weekly;
