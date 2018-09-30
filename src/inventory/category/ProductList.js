import React from 'react'
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { ProductComponent } from '../product/ProductComponent';
import DisplayService from './CategoryDisplayService';
import SelectAllNone from './SelectAllNone';

export default function ProductList(props) {
    const listProducts = () => {
        const categoryProps = props.category;
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
                    parentComponent={props.parentComponent}
                    onSelectedProd={props.onSelectedProd}
                    onHandleMessage={props.onHandleMessage}>
                </ProductComponent>;
            };
            return products.map(productListView);
        } else {
            return ''
        }
    }
    const displaySelectedAll = () => {
        if (DisplayService.selectAllBtn(props.parentComponent).display) {
            return (
                <SelectAllNone
                    checked={props.categorySelect}
                    onSelectAllNone={props.onSelectAllNoneProd}>
                </SelectAllNone>
            )
        } else return ''
    }
    return (
        <Collapse in={true} timeout="auto" unmountOnExit>
            {displaySelectedAll()}
            <List component="div" disablePadding>
                {listProducts()}
            </List>
        </Collapse>
    )
} 