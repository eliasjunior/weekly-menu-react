import React from 'react';
import {Route } from 'react-router-dom'
import MenuPage from './recipe/menu/MenuPage';
import RecipePage from './recipe/recipe-page/RecipePage';
import RecipeListPage from './recipe/RecipeListPage'
import ShoppingListPage from './inventory/ShoppingListPage';
import InventoryPage from './inventory/InventoryPage';
import ProductFormBox from './inventory/product/ProductFormBox';
import { AppConstant } from './common/AppConstant';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import { MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: cyan,
    },
});
function WeeklyRouter() {
    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <Route exact path={AppConstant.PATH.DEFAULT_ROUTE} component={MenuPage}></Route>
                <Route path={AppConstant.PATH.RECIPE_LIST} component={RecipeListPage}></Route>
                <Route path={AppConstant.PATH.SHOPPING} component={ShoppingListPage}></Route>
                <Route path={AppConstant.PATH.NEW_RECIPE} component={RecipePage}></Route>
                <Route path={AppConstant.PATH.PRODUCTS} component={InventoryPage}></Route>
                <Route path={AppConstant.PATH.PRODUCTS_CREATE} component={ProductFormBox}></Route>
            </div>
        </MuiThemeProvider>
    );
}

export default WeeklyRouter 