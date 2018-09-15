import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { AppWeekBar } from '../../common/AppWeekBar';
import { ShoppingListUtilService } from './ShoppingListUtilService';
import { grey } from '@material-ui/core/colors';
import './ShoppingPage.css'
import ProductText from './ProductText';

class ShoppingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingList: props.shoppingList,
            completed: false
        }
        this.buildShoppingList = this.buildShoppingList.bind(this);
    }
    buildShoppingList() {
        if (!this.state.shoppingList || this.state.shoppingList.length === 0) {
            return;
        }
        const shoppingList = this.state.shoppingList;
        
        const categories = shoppingList.categories;

        const recipes = ShoppingListUtilService
            .mapRecAndCatToProducts(shoppingList.recipes);

        const mergedCategories = ShoppingListUtilService.mergeCategories(recipes, categories);

        return mergedCategories.map((category, index) => {
            return <div key={`div-${index}`}>
                <ListItem key={index}
                    style={{ backgroundColor: grey[200] }}>
                    <ListItemText>{category.name}</ListItemText>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {category.products
                            .map((prod, j) => <ProductText {...prod}
                                shopId={shoppingList._id}
                                catId={category._id}
                                key={`${index}-${j}`}
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