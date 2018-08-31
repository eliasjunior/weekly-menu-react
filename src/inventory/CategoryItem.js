import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import '../styles/CategoryItem.css';
import { ProductComponent } from './product/ProductComponent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { CategoryActions } from './CategoryActions';
import { grey } from '@material-ui/core/colors';
import DisplayService from '../DisplayService';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location
        }
        this.listProducts = this.listProducts.bind(this);
        this.selectionProd = this.selectionProd.bind(this);
    }
    listProducts(ingredients) {
        const productListView = (ingredient) => {
            return <ProductComponent
                key={ingredient._id}
                product={ingredient}
                categoryName={this.props.name} 
                location={this.state.location}
                onSelectionProd={this.selectionProd}>
            </ProductComponent>;
        };
        return ingredients.map(productListView);
    }
    selectionProd(selected) {
        this.props.onSelectedProd(selected);
    }
    categoryButtons() {
        return DisplayService
            .categoryBtns(this.state.location).display ?
            <ListItemSecondaryAction>
                <CategoryActions
                    name={this.props.name}
                    id={this.props._id}>
                </CategoryActions>
            </ListItemSecondaryAction> : ''
    }
    render() {
        return (
            <div>
                <ListItem 
                    style={{backgroundColor: grey[100]}}
                    key={this.props._id}>
                    <ListItemText primary={this.props.name} ></ListItemText>
                    {this.categoryButtons()}
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