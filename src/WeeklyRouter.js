import React from 'react';
import {Router, Route, browserHistory} from 'react-router'
import RecipeListComponent from './recipe/RecipeList';
import MenuWeekly from './menu/MenuWeekly';

class WeeklyRouter extends React.Component {

    render() {
        return (

            <Router history={browserHistory}>
                <Route path="/" component={MenuWeekly}></Route>
                <Route path="/recipe" component={RecipeListComponent}></Route>
            </Router>

        );
    }
}

export default WeeklyRouter 