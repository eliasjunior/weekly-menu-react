import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'

export const ItemSelection = (props) => {
    const onChangeSelection = (e) => {
        props.onChangeSelection(e.target.checked, props.name)
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