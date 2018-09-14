import React from 'react';
import ListItem from '@material-ui/core/ListItem';
//import '../styles/CategoryItem.css';
import { ProductComponent } from '../product/ProductComponent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { CategoryActions } from './CategoryActions';
import { grey } from '@material-ui/core/colors';
import DisplayService from './CategoryDisplayService';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.listProducts = this.listProducts.bind(this);
        this.selectionProd = this.selectionProd.bind(this);
        
    }
    listProducts() {
        const category = {
            name: this.props.category.name,
            _id: this.props.category._id
        };
        const products = this.props.category.products;

        if(products.length) {
            const productListView = (product) => {
                return <ProductComponent
                    key={product._id+'-'+(new Date().getTime())}
                    category={category}
                    product={product}
                    parentComponent={this.props.parentComponent}
                    onSelectionProd={this.selectionProd}>
                </ProductComponent>;
            };
            return products.map(productListView);
        } else {
            return ''
        }
    }
    selectionProd(selected) {
        this.props.onSelectedProd(selected);
    }
    categoryButtons() {
        return DisplayService
            .categoryBtns(this.props.parentComponent).display ?
            <ListItemSecondaryAction>
                <CategoryActions
                    name={this.props.category.name}
                    id={this.props.category._id}>
                </CategoryActions>
            </ListItemSecondaryAction> : ''
    }
    render() {
        return (
            <div>
                <ListItem 
                    style={{ backgroundColor: grey[200] }}
                    key={this.props.category._id}>
                    <ListItemText primary={this.props.category.name} ></ListItemText>
                    {this.categoryButtons()}
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.listProducts()}
                    </List>
                </Collapse>
            </div>
        )
    }
}
export default CategoryItem;