import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'

export const ItemSelection = (props) => {
    const onChangeSelection = (e) => {
        const itemProps = {
            checked: e.target.checked, 
            name: props.name,
            parentId: props.parentId,
            parentName: props.parentName
        }
        props.onChangeSelection(itemProps);
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