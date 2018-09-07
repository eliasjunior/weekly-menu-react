import React from 'react';
import { Route, Switch } from 'react-router-dom'
import RecipePage from './recipe/recipe-page/RecipePage';
import RecipeListPage from './recipe/RecipeListPage';
import ShoppingListPage from './inventory/shopping/ShoppingListPage';
import InventoryPage from './inventory/InventoryPage';
import ProductFormPage from './inventory/product/ProductFormPage';
import { AppConstant } from './common/AppConstant';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/orange';
import { MuiThemeProvider } from '@material-ui/core';
import CategoryFormPage from './inventory/category/CategoryFormPage';
import SelectionCollectionService from './service/SelectionCollectionService';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesToInclude: []
        }
        this.callbackIncludeRecipe = this.callbackIncludeRecipe.bind(this);
    }
    callbackIncludeRecipe(param) {
        if(param.checked) {
            const recipesToInclude = 
                SelectionCollectionService
                    .addRecipe(param.recipe, this.state.recipesToInclude);
            this.setState({recipesToInclude});     
            
            console.log('>', recipesToInclude)
        } else {
            const recipesToInclude = 
            SelectionCollectionService
                .removeRecipe(param.recipe, this.state.recipesToInclude);
            this.setState({recipesToInclude});   

            console.log('>', recipesToInclude)
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Route exact path={AppConstant.PATH.DEFAULT_ROUTE} component={InventoryPage}></Route>
                    <Route path={AppConstant.PATH.PRODUCTS} component={ProductFormPage}></Route>
                    <Route 
                        path={`${AppConstant.PATH.CATEGORY}/:id`} 
                        component={CategoryFormPage}>
                    </Route>
                    <Route
                        path={AppConstant.PATH.RECIPE_LIST}
                        render={(props) => 
                        <RecipeListPage {...props} callbackIncludeRecipe={this.callbackIncludeRecipe} />}>
                    </Route>
                    <Route
                        path={AppConstant.PATH.SHOPPING}
                        render={(props) => 
                        <ShoppingListPage {...props} recipesToInclude={this.state.recipesToInclude} />}>
                    </Route>
                    <Switch>
                        <Route 
                            path={`${AppConstant.PATH.NEW_RECIPE}/:id`} component={RecipePage}>
                        </Route>
                        <Route 
                            path={AppConstant.PATH.NEW_RECIPE} component={RecipePage}>
                        </Route>
                    </Switch>
                </div>
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

export default App 