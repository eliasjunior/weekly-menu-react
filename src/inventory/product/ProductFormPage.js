import React from 'react';
import { AppWeekBar } from "../../common/AppWeekBar";
import ProductForm from './ProductForm';

function ProductFormPage(props) {
    const search = props.location.search;
    const params = search
        .slice(search.indexOf('?') + 1)
        .split('&')
        .reduce( (acc, item) => {
            const key = item.slice(0, item.indexOf('='));
            const value = item.slice(item.indexOf('=') + 1);
            acc[key] = value
            return acc;
        }, {} )
    return (
        <div>
            <AppWeekBar title='New Product'></AppWeekBar>
            <ProductForm 
                onHandleMessage={props.onHandleMessage}
                category={params} 
                returnProdList={props.history.goBack}>
            </ProductForm>
        </div>
    );
}
export default ProductFormPage