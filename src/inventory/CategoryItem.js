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
import { grey100 } from 'material-ui/styles/colors';
import CategoryDisplayService from '../CategoryDisplayService';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location
        }
        this.listProducts = this.listProducts.bind(this);
        this.goProductView = this.goProductView.bind(this);
        this.selectionProd = this.selectionProd.bind(this);
    }
    listProducts(ingredients) {
        const productListView = (ingredient) => {
            return <ProductComponent
                key={ingredient._id}
                product={ingredient}
                location={this.state.location}
                onSelectionProd={this.selectionProd}>
            </ProductComponent>;
        };
        return ingredients.map(productListView);
    }
    selectionProd(selected) {
        this.props.onSelectedProd(selected);
    }

    displayCatButtons() {
        return CategoryDisplayService
            .categoryBtns(this.state.location).display ?
            <ListItemSecondaryAction>
                <CategoryActions
                    goProductView={this.goProductView}>
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
                <ListItem primary style={{backgroundColor: grey100}}
                    key={this.props._id}>
                    <ListItemText primary={this.props.name}  />
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