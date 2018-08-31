import React from 'react';
import { AppWeekBar } from "../../common/AppWeekBar";
import ProductForm from './ProductForm';

function ProductFormPage(props) {
    const search = props.location.search;
    const catId = search.slice(search.indexOf('=') + 1);
    return (
        <div>
            <AppWeekBar title='New Product'></AppWeekBar>
            <ProductForm catId={catId} 
                returnProdList={props.history.goBack}>
            </ProductForm>
        </div>
    );
}
export default ProductFormPage