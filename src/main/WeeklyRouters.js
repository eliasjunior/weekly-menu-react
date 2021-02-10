import React from "react";
import { Route, Switch } from "react-router-dom";
import RecipePage from "recipe/recipe-form/RecipePage";
import RecipeListPage from "recipe/recipe-list/RecipeListPage";
import CartPage from "shopping-list/CartPage";
import InventoryPage from "inventory/InventoryPage";
import { LOCATION } from "common/AppConstant";
import CartHistoryPage from "shopping-list/CartHistoryPage";
import Dashboard from "dashboard/Dashboard";
import PickUpProducts from "shopping-list/PickUpProducts";
import Presentation from "../shopping-list/Presentation";
import ShoppingCreateBtns from "../shopping-list/ShoppingCreateBtns";

export default function () {
  return (
    <React.Fragment>
      <Route
        exact
        path={LOCATION.products.path}
        render={(props) => <InventoryPage {...props}></InventoryPage>}
      ></Route>
      <Route
        exact
        path={LOCATION.pickProducts.path}
        render={(props) => <PickUpProducts {...props}></PickUpProducts>}
      ></Route>
      <Route
        exact
        path={LOCATION.dashboard.path}
        render={(props) => <Dashboard {...props}></Dashboard>}
      ></Route>
      <Route
        exact
        path={LOCATION.leftOver.path}
        render={() =>  <Presentation imgDisplay={"/under-construction.png"} mainText={"Not built just yet!"}
        ><ShoppingCreateBtns></ShoppingCreateBtns></Presentation>}
      ></Route>
      <Route
        path={LOCATION.shoppingHistory.path}
        render={(props) => <CartHistoryPage {...props} />}
      ></Route>
      <Route
        path={LOCATION.recipeList.path}
        render={(props) => <RecipeListPage {...props} />}
      ></Route>
      <Route
        path={`${LOCATION.newShoppingList.path}`}
        render={(props) => <CartPage {...props} />}
      ></Route>
      <Route
        path={`${LOCATION.editShoppingList.path}/:id`}
        render={(props) => <CartPage {...props} />}
      ></Route>
      <Switch>
        <Route
          path={`${LOCATION.newRecipe.path}/:id`}
          render={(props) => <RecipePage {...props}></RecipePage>}
        ></Route>
        <Route
          path={LOCATION.newRecipe.path}
          render={(props) => <RecipePage {...props}></RecipePage>}
        ></Route>
      </Switch>
    </React.Fragment>
  );
}
