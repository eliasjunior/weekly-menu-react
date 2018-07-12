import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { RecipeListComponent, RecipeComponent } from './recipe';
import MenuComponent from './recipe/menu/MenuComponent';
import ShoppingListComponent from './inventory/ShoppingListComponent';
import InventoryComponent from './inventory/InventoryComponent';
import ProductFormBox from './inventory/product/ProductFormBox';
import {AppConstant} from './common/AppConstant';

class WeeklyRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={AppConstant.DEFAULT_ROUTE} component={MenuComponent}></Route>
                <Route path={AppConstant.RECIPE_LIST} component={RecipeListComponent}></Route>
                <Route path={AppConstant.SHOPPING} component={ShoppingListComponent}></Route>
                <Route path={AppConstant.NEW_RECIPE} component={RecipeComponent}></Route>
                <Route path={AppConstant.PRODUCTS} component={InventoryComponent}></Route>
                <Route path={AppConstant.PRODUCTS_VIEW} component={ProductFormBox}></Route>
            </Router>
        );
    }
}

export default WeeklyRouter 