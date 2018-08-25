import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'

export const ProductSelection = (props) => {
    const onChangeSelection = (e) => {
        props.onChangeSelection(e.target.checked)
    }
    return (
        <div>
            <Checkbox checked={props.selected}
                onChange={onChangeSelection}
                value={props.name}>
            </Checkbox>
        </div>
    )
}