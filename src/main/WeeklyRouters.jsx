import React from "react";
import { Route, Switch } from "react-router-dom";
import RecipePage from "recipe/components/RecipePage";
import RecipeListPage from "recipe/components/RecipeListPage";
import CartPage from "shopping-list/components/CartPage";
import InventoryPage from "inventory/components/InventoryPage";
import { LOCATION } from "common/AppConstant";
import CartHistoryPage from "shopping-list/components/CartHistoryPage";
import Dashboard from "dashboard/Dashboard";
import PickUpProducts from "shopping-list/components/PickUpProducts";
import Presentation from "shopping-list/components/Presentation";
import CartCreateBtn from "shopping-list/components/CartCreateBtn";

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
        render={() => (
          <Presentation
            imgDisplay={"/under-construction.png"}
            mainText={"Not built just yet!"}
          >
            <CartCreateBtn></CartCreateBtn>
          </Presentation>
        )}
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
