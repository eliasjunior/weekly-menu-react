import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { RecipeListComponent, RecipeComponent } from './recipe';
import MenuComponent from './recipe/menu/MenuComponent';
import ShoppingListComponent from './inventory/ShoppingListComponent';
import ProductView from './inventory/product/ProductView.js';

class WeeklyRouter extends React.Component {

    render() {
        return (

            <Router history={browserHistory}>
                <Route path="/" component={MenuComponent}></Route>
                <Route path="/recipe" component={RecipeListComponent}></Route>
                <Route path="/shopping" component={ShoppingListComponent}></Route>
                <Route path="/recipe/form" component={RecipeComponent}></Route>
                <Route path="/product/form" component={ProductView}></Route>
            </Router>

        );
    }
}

export default WeeklyRouter 