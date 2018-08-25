import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import '../styles/CategoryItem.css';
import { ProductComponent } from './product/ProductComponent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { browserHistory } from 'react-router';
import { AppConstant } from '../common/AppConstant';
import { CategoryActions } from './CategoryActions';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nested: [],
            checked: [],
            location: props.location
        }
        this.listProducts = this.listProducts.bind(this);
        this.goProductView = this.goProductView.bind(this);
    }
    listProducts(ingredients) {
        const productListView = (ingredient) => {
            return <ProductComponent
                key={ingredient._id}
                product={ingredient}
                location={this.state.location}>
            </ProductComponent>;
        };
        return ingredients.map(productListView);
    }
    displayCatButtons() {
        return this.state.location === '/products' ?
            <ListItemSecondaryAction>
                <CategoryActions
                    isProdAction={true}
                    goProductView={this.goProductView}
                    goSelectRecipe={this.goSelectRecipe}>
                </CategoryActions>
            </ListItemSecondaryAction> : ''
    }
    goProductView(id) {
        browserHistory.push({
            pathname: AppConstant.PRODUCTS_VIEW,
            search: "?catId=" + id,
        });
    }
    render() {
        return (
            <div>
                <ListItem
                    key={this.props._id}>
                    <ListItemText primary={this.props.name} />
                    {this.displayCatButtons()}
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.listProducts(this.props.ingredients)}
                    </List>
                </Collapse>
            </div>
        )
    }
}
export default CategoryItem;