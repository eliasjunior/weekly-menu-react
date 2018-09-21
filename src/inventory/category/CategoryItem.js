import React from 'react';
import PropTypes from 'prop-types'
import { ProductComponent } from '../product/ProductComponent';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';

import DisplayService from './CategoryDisplayService';
import CloneDeep from 'lodash.clonedeep'
import SelectAllNone from './SelectAllNone';
import CategoryLine from './CategoryLine';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorySelect: false,
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
                <CategoryLine
                    category={this.props.category}
                    parentComponent={this.props.parentComponent}
                    onHandleMessage={this.props.onHandleMessage}
                    onRefresh={this.props.onRefresh}>
                </CategoryLine>
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
CategoryItem.propTypes = {
    category: PropTypes.object,
    onHandleMessage: PropTypes.func,
    onRefresh: PropTypes.func,
    parentComponent: PropTypes.string
}
export default CategoryItem;