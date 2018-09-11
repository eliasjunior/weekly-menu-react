import React from 'react';
import { List, ListItem, ListItemText, Button, Collapse } from '@material-ui/core';
import MessageComponent from '../../common/MessageComponent';
import { AppWeekBar } from '../../common/AppWeekBar';
import { ShoppingListUtilService } from './ShoppingListUtilService';
import ShoppingListService from './ShoppingListService';
import { grey } from '@material-ui/core/colors';
import './ShoppingPage.css'
import ProductText from './ProductText';

class ShoppingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            shoppingList: this.props.shoppingList,
            completed: false
        }
        this.buildShoppingList = this.buildShoppingList.bind(this);
        this.completedItem = this.completedItem.bind(this);
    }
    componentDidMount() {
        // TODO for test, delete later
        if (!this.props.shoppingList) {
            ShoppingListService
                .get()
                .then(response => {
                    this.setState({ shoppingList: response[0] })
                })
                .catch(reason => this.setState({ message: reason.message }));
        }

    }
    completedItem(product) {
        this.setState({completed: !this.state.completed})
        product.completed  = !product.completed
    }
    buildShoppingList() {
        if (!this.state.shoppingList || this.state.shoppingList.length === 0) {
            return;
        }
        const shoppingList = this.state.shoppingList;
        const recipes = shoppingList.recipes;
        const categories = shoppingList.categories;

        const mergedCategories = ShoppingListUtilService.mergeCategories(recipes, categories);

        console.log('mergedCategories', mergedCategories)

        return mergedCategories.map((category, index) => {
            return <div key={`div-${index}`}>
                <ListItem key={index}
                    style={{ backgroundColor: grey[400] }}>
                    <ListItemText>{category.name}</ListItemText>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {category.products
                            .map((prod, j) => <ProductText {...prod} key={`${index}-${j}`}></ProductText>)}
                    </List>
                </Collapse>
            </div>
        });
    }
    render() {
        return (
            <div>
                <AppWeekBar title="Shopping list"></AppWeekBar>
                <MessageComponent message={this.state.message}></MessageComponent>
                <List>
                    {this.buildShoppingList()}
                </List>
            </div>
        )
    }
}



export default ShoppingPage;