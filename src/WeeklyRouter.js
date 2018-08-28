import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import RecipePage  from './recipe/recipe-page/RecipePage';
import RecipeListPage from './recipe/RecipeListPage'
import MenuPage from './recipe/menu/MenuPage';
import ShoppingListPage from './inventory/ShoppingListPage';
import InventoryPage from './inventory/InventoryPage';
import ProductFormBox from './inventory/product/ProductFormBox.js';
import {AppConstant} from './common/AppConstant';

class WeeklyRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={AppConstant.DEFAULT_ROUTE} component={MenuPage}></Route>
                <Route path={AppConstant.RECIPE_LIST} component={RecipeListPage}></Route>
                <Route path={AppConstant.SHOPPING} component={ShoppingListPage}></Route>
                <Route path={AppConstant.NEW_RECIPE} component={RecipePage}></Route>
                <Route path={AppConstant.PRODUCTS} component={InventoryPage}></Route>
                <Route path={AppConstant.PRODUCTS_VIEW} component={ProductFormBox}></Route>
            </Router>
        );
    }
}

export default WeeklyRouter 