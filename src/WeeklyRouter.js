import React from 'react';
import {Router, Route, browserHistory} from 'react-router'
import RecipeListComponent from './recipe/RecipeListComponent';
import MenuComponent from './menu/MenuComponent';

class WeeklyRouter extends React.Component {

    render() {
        return (

            <Router history={browserHistory}>
                <Route path="/" component={MenuComponent}></Route>
                <Route path="/recipe" component={RecipeListComponent}></Route>
            </Router>

        );
    }
}

export default WeeklyRouter 