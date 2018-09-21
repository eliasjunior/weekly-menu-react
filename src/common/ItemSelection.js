import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'

export const ItemSelection = (props) => {
    const onChangeSelection = (e) => {
        const itemProps = {
            checked: e.target.checked,
            product: props.product,
            category: props.parent
        }
        props.onChangeSelection(itemProps);
    }
    return (
        <div>
            <Checkbox checked={props.product.checked ? true : false}
                onChange={onChangeSelection}
                value={props.product.name}>
            </Checkbox>
        </div>
    )
}