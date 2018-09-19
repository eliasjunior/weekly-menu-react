import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { AppWeekBar } from '../common/AppWeekBar';
import { ShoppingListUtilService } from './ShoppingListUtilService';
import { grey } from '@material-ui/core/colors';
import './ShoppingPage.css'
import ProductText from './ProductText';
import ShoppingListService from './ShoppingListService';

class ShoppingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingList: [],
            completed: false
        }
        this.buildShoppingList = this.buildShoppingList.bind(this);
    }
    componentDidMount() {
        ShoppingListService
            .getOne(this.props.match.params.id)
            .then(response => this.setState({shoppingList: response}))
            .catch(reason => this.props.onHandleMessage({ message: reason.message }))
    }
    buildShoppingList() {
        if (this.state.shoppingList.length === 0) {
            return;
        }
        const shoppingList = this.state.shoppingList;
        
        const categories = shoppingList.categories;

        const recipes = ShoppingListUtilService
            .addRecInfoToProduct(shoppingList.recipes);

        const mergedCategories = ShoppingListUtilService.mergeCategories(recipes, categories);

        return mergedCategories.map((category, index) => {
            return <div key={category._id}>
                <ListItem 
                    style={{ backgroundColor: grey[300] }}>
                    <ListItemText>{category.name}</ListItemText>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {category.products
                            .map((prod, j) => <ProductText {...prod}
                                shopId={shoppingList._id}
                                catId={category._id}
                                key={`${category._id}-${prod._id}`}
                                onHandleMessage={this.props.onHandleMessage}>
                            </ProductText>)}
                    </List>
                </Collapse>
            </div>
        });
    }
    render() {
        return (
            <div>
                <AppWeekBar title="Shopping list"></AppWeekBar>
                <List>
                    {this.buildShoppingList()}
                </List>
            </div>
        )
    }
}



export default ShoppingPage;