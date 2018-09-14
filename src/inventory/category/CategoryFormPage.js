import React from 'react';
import AppWeekBar from '../../common/AppWeekBar';
import CategoryForm from './CategoryForm';

function CategoryFormPage(props) {
    // destrucring with default values, only for practice
    const {match: {params: {id} = ''} = {}} = props;
    const {location: {search}} = props;
    const name = search.slice(search.indexOf('=') + 1);
    return (
        <div>
            <AppWeekBar title="New Category"></AppWeekBar>
            <CategoryForm 
                onHandleMessage={props.onHandleMessage}
                returnProdList={props.history.goBack} 
                id={id} 
                name={name}>
            </CategoryForm>
        </div>
    )
}
export default CategoryFormPage