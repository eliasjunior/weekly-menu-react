import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

export const EditableLabel = (props) => {
    const getEventChange = (e) => {
        props.onChangeName(e.target.value)
    }
    const displayNameOrInput = () => {
        const productName = props.product.name;
        const secondaryLabel = props.secondaryLabel;
        return props.editFieldMode ? 
            <TextField onChange={getEventChange} 
                defaultValue={productName}>
            </TextField> :
            <ListItemText 
                primary={productName}
                secondary={secondaryLabel}>
            </ListItemText>
    }
    return (<div style={props.style}>{displayNameOrInput()}</div>)
}   