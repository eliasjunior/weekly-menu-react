import React from "react";
import { Route, Switch } from "react-router-dom";
import RecipePage from "recipe/recipe-form/RecipePage";
import RecipeListPage from "recipe/RecipeListPage";
import ShoppingListPage from "shopping-list/ShoppingListPage";
import InventoryPage from "inventory/InventoryPage";
import { AppConstant } from "common/AppConstant";
import ShoppingListHistoryPage from "shopping-list/ShoppingListHistoryPage";
import ShoppingPage from "shopping-list/ShoppingPage";
import Dashboard from "dashboard/Dashboard";

export default function() {
  return (
    <React.Fragment>
      <Route
        exact
        path={AppConstant.LOCATION.products.path}
        render={props => <InventoryPage {...props}></InventoryPage>}
      ></Route>
      <Route
        exact
        path={AppConstant.LOCATION.dashboard.path}
        render={props => <Dashboard {...props}></Dashboard>}
      ></Route>
      <Route
        path={AppConstant.LOCATION.shoppingHistory.path}
        render={props => <ShoppingListHistoryPage {...props} />}
      ></Route>
      <Route
        path={`${AppConstant.LOCATION.shopping.path}/:id`}
        render={props => <ShoppingPage {...props} />}
      ></Route>
      <Route
        path={AppConstant.LOCATION.recipeList.path}
        render={props => <RecipeListPage {...props} />}
      ></Route>
      <Route
        path={`${AppConstant.LOCATION.newShoppingList.path}`}
        render={props => <ShoppingListPage {...props} />}
      ></Route>
      <Route
        path={`${AppConstant.LOCATION.editShoppingList.path}/:id`}
        render={props => <ShoppingListPage {...props} />}
      ></Route>
      <Switch>
        <Route
          path={`${AppConstant.LOCATION.newRecipe.path}/:id`}
          render={props => <RecipePage {...props}></RecipePage>}
        ></Route>
        <Route
          path={AppConstant.LOCATION.newRecipe.path}
          render={props => <RecipePage {...props}></RecipePage>}
        ></Route>
      </Switch>
    </React.Fragment>
  );
}
