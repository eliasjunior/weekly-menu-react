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
import CloneDeep from 'lodash.clonedeep'
import SelectAllNone from './SelectAllNone';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorySelect: false
        }
        this.listProducts = this.listProducts.bind(this);
        this.selectionProd = this.selectionProd.bind(this);
        this.selectAllNoneProd = this.selectAllNoneProd.bind(this);
        this.selectAllNoneProd = this.selectAllNoneProd.bind(this);
    }
    listProducts() {
        const categoryProps = this.props.category;
        const category = {
            name: categoryProps.name,
            _id: categoryProps._id
        };
        const products = categoryProps.products;

        if (products.length) {
            const productListView = (product) => {
                return <ProductComponent
                    key={product._id}
                    category={category}
                    product={product}
                    parentComponent={this.props.parentComponent}
                    onSelectionProd={this.selectionProd}
                    onHandleMessage={this.props.onHandleMessage}>
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
    selectAllNoneProd() {
        const category = CloneDeep(this.props.category);
        const categorySelect = !this.state.categorySelect
        const itemSelected = {
            categoryName: category.name,
            catId: category._id,
            checked: categorySelect
        }
        this.setState({ categorySelect })
        this.props.onSelectAllProd(itemSelected)
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
    displaySelectedAll() {
        if (DisplayService.selectAllBtn(this.props.parentComponent).display) {
            return <SelectAllNone
                checked={this.state.categorySelect}
                onSelectAllNone={this.selectAllNoneProd}>
            </SelectAllNone>
        } else return ''
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
                    {this.displaySelectedAll()}
                    <List component="div" disablePadding>
                        {this.listProducts()}
                    </List>
                </Collapse>
            </div>
        )
    }
}
export default CategoryItem;