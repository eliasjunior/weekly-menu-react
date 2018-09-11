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
import SelectionCollectionService from './service/UtilCollectionService';
import ShoppingListHistoryPage from './inventory/shopping/ShoppingListHistoryPage';
import ShoppingPage from './inventory/shopping/ShoppingPage';
import MessageComponent from './common/MessageComponent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesToInclude: [],
            shoppingList: null,
            alert: {
                message: null,
                open: false
            }
        }
        this.callbackIncludeRecipe = this.callbackIncludeRecipe.bind(this);
        this.selectedShopList = this.selectedShopList.bind(this);
        this.editShoppingList = this.editShoppingList.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }
    callbackIncludeRecipe(param) {
        if (param.checked) {
            const recipesToInclude =
                SelectionCollectionService
                    .addRecipe(param.recipe, this.state.recipesToInclude);
            this.setState({ recipesToInclude });

            console.log('>', recipesToInclude)
        } else {
            const recipesToInclude =
                SelectionCollectionService
                    .removeRecipe(param.recipe, this.state.recipesToInclude);
            this.setState({ recipesToInclude });

            console.log('>', recipesToInclude)
        }
    }
    selectedShopList(shoppingList) {
        console.log('child set', shoppingList)
        this.setState({ shoppingList });
    }
    editShoppingList(shoppingList) {
        console.log('Update set', shoppingList)
        // TODO check about persist check flag
        shoppingList.recipes.forEach(recipe => {
            recipe.categories.forEach(cat => {
                cat.products.forEach(prod => prod.checked = true)
            });
        });
        this.setState({ shoppingList });
    }
    messageComponent() {
        const alert = this.state.alert;
        if (alert.message) {
            return <MessageComponent
                message={alert.message} 
                isOpen={alert.open} 
                onClose={this.handleClose} 
                type={alert.type}>
            </MessageComponent>
        }
        return ''
    }
    handleMessage(alert) {
        let {
            message,
            type
        } = alert;
        this.setState({
            alert: {
                message,
                open: true,
                type
            }
        })
    }
    handleClose() {
        const alert = {
            message: '',
            open: false
        }
        this.setState({alert})
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    {this.messageComponent.call(this)}
                    <Route exact path={AppConstant.LOCATION.home.path} component={InventoryPage}></Route>
                    <Route path={AppConstant.LOCATION.product.path} component={ProductFormPage}></Route>
                    <Route path={AppConstant.LOCATION.shoppingHistory.path}
                        render={(props) => <ShoppingListHistoryPage  {...props}
                            selectedShopList={this.selectedShopList}
                            editShoppingList={this.editShoppingList} />}>
                    </Route>
                    <Route path={AppConstant.LOCATION.shopping.path}
                        render={(props) => <ShoppingPage  {...props}
                            shoppingList={this.state.shoppingList} />}>
                    </Route>
                    <Route
                        path={`${AppConstant.LOCATION.category.path}/:id`}
                        component={CategoryFormPage}>
                    </Route>
                    <Route
                        path={AppConstant.LOCATION.recipeList.path}
                        render={(props) =>
                            <RecipeListPage {...props}
                                callbackIncludeRecipe={this.callbackIncludeRecipe} />}>
                    </Route>
                    <Route
                        path={`${AppConstant.LOCATION.newShoppingList.path}`}
                        render={(props) =>
                            <ShoppingListPage {...props}
                                onHandleMessage={this.handleMessage}
                                recipesToInclude={this.state.recipesToInclude} />}>
                    </Route>
                    <Route
                        path={`${AppConstant.LOCATION.editShoppingList.path}/:id`}
                        render={(props) =>
                            <ShoppingListPage {...props}
                                shoppingList={this.state.shoppingList} />}>
                    </Route>
                    <Switch>
                        <Route
                            path={`${AppConstant.LOCATION.newRecipe.path}/:id`} component={RecipePage}>
                        </Route>
                        <Route
                            path={AppConstant.LOCATION.newRecipe.path} component={RecipePage}>
                        </Route>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

function getAlert(message) {
    return { alert: {message, open: true} }
}
const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: teal
    }
});

export default App 