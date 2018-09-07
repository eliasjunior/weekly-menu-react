import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'

export const ItemSelection = (props) => {
    const onChangeSelection = (e) => {
        props.product.checked = e.target.checked;
        const itemProps = {
            checked: props.product.checked,
            product: props.product,
            category: props.parent
        }
        props.onChangeSelection(itemProps);
    }
    // function print() {
    //     console.log('updated ' + props.product.name, props.product.checked)
    // }
    return (
        <div>
            <Checkbox checked={props.product.checked ? true : false}
                onChange={onChangeSelection}
                value={props.product.name}>
            </Checkbox>
        </div>
    )
}